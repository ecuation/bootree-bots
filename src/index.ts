import mongoose from 'mongoose';
import { app } from './app';

const init = async () => {

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection succesfful to ${process.env.MONGO_URI}`);
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log('Bots server is running on port 3000');
    });
};

init();