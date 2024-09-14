import express from 'express';
import mongoConfig from './config/mongoConfig';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import noteRoutes from './routes/noteRoutes';

// Initialize dotenv
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
// Express middlewares
app.use(express.json());

// MongoDB connection
mongoConfig();

// Task routes
app.use('/api', taskRoutes);
// Note routes
app.use('/api', noteRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
