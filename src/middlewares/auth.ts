import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { RevokedToken } from '../models/revoked-token';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
    }

    if (!token || await RevokedToken.exists({ token })) {
        throw new NotAuthorizedError();
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new NotAuthorizedError();
    }

    next();
};