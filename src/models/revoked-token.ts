import mongoose from 'mongoose';
import { RevokedTokenDoc, RevokedTokenModel } from '../types/revoked-token-types';

const revokedTokenScheema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },
        revokedAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

const RevokedToken = mongoose.model<RevokedTokenDoc, RevokedTokenModel>('RevokedToken', revokedTokenScheema);
export { RevokedToken }