import { NextFunction, Request, Response } from 'express';
import { isHttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export const errorHandeler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  let message = 'An unknown error occurred';
  let status = StatusCodes.INTERNAL_SERVER_ERROR;
  if (isHttpError(error)) {
    status = error.status;
    message = error.message;
  }
  // Send back an error response to the client
  return res.status(status).jsonp({
    status,
    message,
    stack: process.env.NODE_ENV === 'production' ? '😎' : error.stack,
  });
};
