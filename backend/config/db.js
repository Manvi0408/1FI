import mongoose from 'mongoose';

let memoryServer = null;

/**
 * Connects to MongoDB.
 *
 * - If MONGODB_URI is provided, connects to that real MongoDB instance.
 * - Otherwise, spins up an in-memory MongoDB (mongodb-memory-server) so the
 *   application runs without any manual database installation. This keeps the
 *   "data lives in a database, nothing hardcoded" requirement while staying
 *   trivial to run on a fresh machine.
 */
export async function connectDB() {
  let uri = process.env.MONGODB_URI;

  if (!uri) {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri();
    console.log('No MONGODB_URI set — started in-memory MongoDB.');
  }

  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
  return uri;
}

export async function disconnectDB() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}

/** True when the connection is backed by the in-memory server. */
export function isEphemeral() {
  return memoryServer !== null;
}
