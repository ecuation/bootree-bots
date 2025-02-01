import request from 'supertest';
import { app } from '../../app';
import { OpenAIService } from '../../services/open-ai-service';
import { generateToken } from '../../actions/jwt-generator';
import { RevokedToken } from '../../models/revoked-token';

jest.mock('../../services/open-ai-service');
jest.mock('../../services/twitch-service');

const MockedOpenAIService = OpenAIService as jest.MockedClass<typeof OpenAIService>;
const token = generateToken('abcd');

beforeEach(() => {
    jest.clearAllMocks();
});

it('it returns 200 and the assistant message', async () => {
    const mockResponse = '!title testing 123 abc';
    const message = 'testing an input message';
    const type = 'nightbot';
    MockedOpenAIService.prototype.assistant.mockResolvedValue(mockResponse);
    const response = await request(app)
        .post('/api/bot/assistant')
        .set('Authorization', `Bearer ${token}`)
        .send({
            message,
            type
        }).expect(200);

    expect(response.body).toEqual({ moderation: mockResponse });
    expect(MockedOpenAIService.prototype.assistant).toHaveBeenCalledWith(message, type);
    expect(MockedOpenAIService.prototype.assistant).toHaveBeenCalledTimes(1);
});

it('it returns null when moderation env var is deactivated', async () => {
    process.env.MODERATION_ACTIVE = 'false';
    const response = await request(app)
        .post('/api/bot/assistant')
        .set('Authorization', `Bearer ${token}`)
        .send({
            message: 'testing an input message',
            type: 'twitch'
        }).expect(200);
    expect(response.body.moderation).toBeNull();
});

it('it return 401 if token has token has been revoked', async () => {
    await RevokedToken.create({ token });
    await request(app)
        .post('/api/bot/assistant')
        .set('Authorization', `Bearer ${token}`)
        .send({
            message: 'testing an input message',
            type: 'nightbot'
        }).expect(401);
});

it('it return 401 if token is invalid', async () => {
    await request(app)
        .post('/api/bot/assistant')
        .set('Authorization', `Bearer abcd`)
        .send({
            message: 'testing an input message',
            type: 'nightbot'
        }).expect(401);
});

it('it returns bad request 400 when not valid inputs', async () => {
    await request(app)
        .post('/api/bot/assistant')
        .send({
            message: 'testing an input message',
            type: 'aaaa'
        }).expect(400);
});