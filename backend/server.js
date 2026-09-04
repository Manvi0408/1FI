import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB, isEphemeral } from './config/db.js';
import { seedIfEmpty } from './seed/seedData.js';
import productRoutes from './routes/products.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', ephemeralDb: isEphemeral() });
});

app.use('/api/products', productRoutes);

// 404 for unknown API routes.
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Central error handler.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  // When running on the in-memory database there is nothing to persist, so
  // always seed it. On a real database, only seed when it is empty.
  await seedIfEmpty({ force: isEphemeral() });

  app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
