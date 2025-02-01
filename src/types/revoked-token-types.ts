import mongoose from 'mongoose';

export interface RevokedTokenAttributes {
    token: string;
    revokedAt: Date;
}

export interface RevokedTokenModel extends mongoose.Model<RevokedTokenDoc> {
    build(attrs: RevokedTokenAttributes): RevokedTokenDoc;
}

export interface RevokedTokenDoc extends mongoose.Document {
    token: string;
    revokedAt: Date;
}