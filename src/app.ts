import express from 'express';
import { json } from 'body-parser';
import { assistantRouter } from './routes/assistant';

const app = express();

app.use(json());
app.use(assistantRouter);

export { app };

