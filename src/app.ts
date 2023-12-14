import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { errorHandeler } from './middleware/error.handeler';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).jsonp({
    message: 'Server is running.....',
    timezone: process.env.TZ,
    timestamp: new Date(),
  });
});

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Error simulate by express server.');
  // Send error to next middleware
  next(error);
});

// Errorhandeler middleware
app.use(errorHandeler);

export default app;
