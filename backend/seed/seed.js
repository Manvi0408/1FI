/**
 * Standalone seeder. Run with `npm run seed`.
 * Useful when pointing at a real MongoDB (set MONGODB_URI) — it force-reseeds
 * the catalogue and exits.
 */
import 'dotenv/config';
import { connectDB, disconnectDB } from '../config/db.js';
import { seedIfEmpty } from './seedData.js';

async function run() {
  await connectDB();
  await seedIfEmpty({ force: true });
  await disconnectDB();
  console.log('Done.');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
