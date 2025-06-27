import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from './middleware/logger'; // adjust the path

const app = express();


app.use(express.json());
app.use(logger);
app.use(cors());


app.get('/', (req: Request, res: Response) => {
  res.json({'message':'Hello, Prisma with Express!'});
});


import taskRouter from './routes/taskRoutes'
app.use('/task',taskRouter);

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
