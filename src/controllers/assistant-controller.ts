import { Request, Response } from 'express';
import { OpenAIService } from '../services/open-ai-service';
import { TwitchChatService } from '../services/twitch-service';

const openAIService = new OpenAIService();
const twitchService = new TwitchChatService();

const assistantRequest = async (req: Request, res: Response) => {
    const { message, type } = req.body;
    const active = JSON.parse(process.env.MODERATION_ACTIVE || "false");

    if (!active) {
        res.send({ moderation: null });
        return;
    }

    const moderation = await openAIService.assistant(message, type);

    if (moderation) {
        twitchService.say(moderation);
    }

    res.send({ moderation });
};

export { assistantRequest };