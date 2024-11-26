import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;
  
// Ensure MONGODB_URI is defined
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Set up a cache for the mongoose connection
let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Establish a new connection if no promise exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export default connectDB;
