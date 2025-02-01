import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const expiresIn = '1h';

if (!secret) {
    throw new Error('JWT_SECRET must be defined');
}

export const generateToken = (id: string): string => {
    return jwt.sign({ id }, secret, { expiresIn });
}