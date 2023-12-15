import { NextFunction, Request, RequestHandler, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import NoteModel from '../models/notes.model';
import { log } from 'console';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notes = await NoteModel.find({}).exec();
    res.status(StatusCodes.OK).jsonp({
      status: 'success',
      notes,
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
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId))
      throw createHttpError(StatusCodes.BAD_REQUEST, 'Invalid noteId.');
    const note = await NoteModel.findOne({ _id: noteId }).exec();
    return res.status(StatusCodes.OK).jsonp({
      status: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};

// Define type for create body
interface CreateNoteBody {
  title?: string;
  text?: string;
}
export const createNote: RequestHandler<any, any, CreateNoteBody, any> = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, text } = req.body;
  try {
    if (!title)
      throw createHttpError(StatusCodes.BAD_REQUEST, 'Note must have title.');
    const newNote = await NoteModel.create({
      title,
      text,
    });
    return res.status(StatusCodes.CREATED).jsonp({
      status: true,
      newNote,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(StatusCodes.ACCEPTED).jsonp({
    updateNote: req.body,
    noteId: req.params.noteId,
  });
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(StatusCodes.OK).jsonp({
    noteId: req.params.noteId,
  });
};
