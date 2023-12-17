import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { con: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.con) {
    return cached.con;
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is undefined");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cached.con = await cached.promise;

  return cached.con;
};
