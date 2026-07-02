import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeErrorRouter from './routes/errorAnalysis';
import authMiddleware from './middleware/auth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use('/api/analyze-error', analyzeErrorRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
