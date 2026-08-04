import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middlewares/error.middleware.js';
import guideRoutes from './routes/guide.routes.js';
import travelRoutes from './routes/travel.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/travels', travelRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
