import express from 'express';
import { json } from 'body-parser';

const app = express();

app.get('/api/bot/chat', (req, res) => {
    res.send('hello buddy!');
});

app.listen(3000, () => {
    console.log('Bots server is running con port 3000');
});

