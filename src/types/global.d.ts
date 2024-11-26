import mongoose from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      mongooseCache: {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
      };
    }
  }
}
