import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).jsonp({
    message: 'Server is running.....',
    timezone: process.env.TZ,
    timestamp: new Date(),
  });
});

export default app;
