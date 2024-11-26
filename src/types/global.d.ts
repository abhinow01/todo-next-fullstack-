// src/types/global.d.ts or src/global.d.ts
import mongoose from 'mongoose';

declare global {
  // Extend the global object with the mongooseCache property
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}
