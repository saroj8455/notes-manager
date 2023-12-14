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

export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(StatusCodes.OK).jsonp({
    noteId: req.params,
  });
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(StatusCodes.CREATED).jsonp({
    createNote: req.body,
  });
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(StatusCodes.ACCEPTED);
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(StatusCodes.OK);
};
