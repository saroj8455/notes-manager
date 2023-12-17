import { NextFunction, Request, RequestHandler, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import NoteModel from '../models/notes.model';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { checkEmpty, checkMongoObjectId } from '../utils/common.util';

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
    // check MongoId
    checkMongoObjectId(noteId);
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
interface NoteBody {
  title?: string;
  text?: string;
}
export const createNote: RequestHandler<any, any, NoteBody, any> = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, text } = req.body;
  try {
    checkEmpty(title);
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

export const updateNote: RequestHandler<any, any, NoteBody, any> = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const noteId = req.params.noteId;
  const { title, text } = req.body;
  try {
    checkMongoObjectId(noteId);

    // Check existing note
    const note = await NoteModel.findById(noteId);

    if (!note)
      throw createHttpError(StatusCodes.NOT_FOUND, `${noteId} not exist`);
    const updatedNote = await NoteModel.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });
    return res.status(StatusCodes.ACCEPTED).jsonp({
      updatedNote,
      noteId: req.params.noteId,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const noteId = req.params.noteId;
  try {
    // Check existing note
    const note = await NoteModel.findById(noteId);

    if (!note)
      throw createHttpError(StatusCodes.NOT_FOUND, `${noteId} not exist`);
    const deleteResp = await NoteModel.findByIdAndDelete(noteId);
    return res.status(StatusCodes.OK).jsonp({
      noteId: req.params.noteId,
      deleteResp,
    });
  } catch (error) {
    next(error);
  }
};
