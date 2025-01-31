import request from 'supertest';
import { app } from '../../app';
import { OpenAIService } from '../../services/OpenAIService';

jest.mock('../../services/OpenAIService');
jest.mock('../../services/TwitchChatService');

const MockedOpenAIService = OpenAIService as jest.MockedClass<typeof OpenAIService>;

beforeEach(() => {
    jest.clearAllMocks();
});

it('it returns 200 and the assistant message', async () => {
    const mockResponse = '!title testing 123 abc';
    MockedOpenAIService.prototype.assistant.mockResolvedValue(mockResponse);
    const response = await request(app)
        .post('/api/bot/assistant')
        .send({
            message: 'test',
            type: 'nightbot'
        }).expect(200);

    expect(response.body).toEqual({ moderation: mockResponse });
    expect(MockedOpenAIService.prototype.assistant).toHaveBeenCalledWith('test', 'nightbot');
    expect(MockedOpenAIService.prototype.assistant).toHaveBeenCalledTimes(1);
});

it('it returns null when moderation env var is not active', async () => {
    process.env.MODERATION_ACTIVE = 'false';
    const response = await request(app)
        .post('/api/bot/assistant')
        .send({
            message: 'test',
            type: 'asdf'
        }).expect(200);
    expect(response.body.moderation).toBeNull();
});