import { Request, Response, NextFunction } from 'express';

// Manual API logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Event fires when the response has been sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    console.log(log);
  });

  next();
};

export default logger;
