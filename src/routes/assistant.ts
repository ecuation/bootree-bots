import express, { Request, Response } from 'express';
import { OpenAIService } from '../services/OpenAIService';
import { TwitchChatService } from '../services/TwitchChatService';

const router = express.Router();
const twitchService = new TwitchChatService();
const openAIService = new OpenAIService();

router.post('/api/bot/assistant', async (req: Request, res: Response) => {
    // TODO refactor in a controller and avoid multiple ifs
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
});

export { router as assistantRouter };