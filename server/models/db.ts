import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

const db = mongoose.connect(process.env.MONGODB_URI);
export { db }
