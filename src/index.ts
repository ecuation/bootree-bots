import express from 'express';
import { json } from 'body-parser';
import { TwitchChatService } from './services/TwitchChatService';
import { BotBouncer } from "./services/BotBouncer";

const app = express();

const init = async () => {
    const bouncer = new BotBouncer();
    //await bouncer.updateBots();
    //const bots = await bouncer.readBotsFile();

    app.get('/api/bot/chat', (req, res) => {
        res.send('hello buddy!');
    });

    app.listen(3000, () => {
        console.log('Bots server is running con port 3000');
    });
};

init();