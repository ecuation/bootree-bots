import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { NotFoundError, errorHandler } from '@bootree/common';
import { assistantRouter } from './routes/assistant';
import { swaggerSpec } from './routes/swagger';

const app = express();

app.use(json());
app.use(assistantRouter);
app.use('/api/bot/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.all('/*any', (req: Request, res: Response) => {
    throw new NotFoundError();
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});

export { app };

