import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(StatusCodes.OK).jsonp({
      status: 'success',
      message: 'Get All Notes API.',
    });
  } catch (error) {
    next(error);
  }
};
