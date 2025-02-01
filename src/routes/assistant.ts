import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { OpenAIService } from '../services/open-ai-service';
import { TwitchChatService } from '../services/twitch-service';
import { auth } from '../middlewares/auth';

const router = express.Router();
const twitchService = new TwitchChatService();
const openAIService = new OpenAIService();


/**
 * @swagger
 * /api/bot/assistant:
 *   post:
 *     summary: Process a moderation request for Twitch or Nightbot
 *     description: Sends a message to OpenAI for moderation and optionally responds via Twitch chat.
 *     tags: 
 *       - Assistant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "cambia el juego a mario kart 8"
 *                 description: Message to be moderated (10-50 chars)
 *               type:
 *                 type: string
 *                 enum: [twitch, nightbot]
 *                 example: "twitch"
 *                 description: The platform type (twitch or nightbot)
 *     responses:
 *       200:
 *         description: Successfully processed the moderation request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 moderation:
 *                   type: string
 *                   nullable: true
 *                   example: "Message approved"
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 */
router.post('/api/bot/assistant', [
    body('message')
        .isLength({ min: 10, max: 50 })
        .withMessage('Message must be between 10 and 50 characters'),
    body('type')
        .isIn(['twitch', 'nightbot'])
        .withMessage('Type must be twitch or nighbot')
], validateRequest, auth, async (req: Request, res: Response) => {
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