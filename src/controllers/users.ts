import { NextFunction, Request, RequestHandler, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import NoteModel from '../models/notes.model';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { checkEmpty, checkMongoObjectId } from '../utils/common.util';
import NoteUsersModel from '../models/users.model';
import bcrypt from 'bcrypt';

// Define type for create body
interface UserBody {
  username?: string;
  email?: string;
  password?: string;
}

export const createUser: RequestHandler<any, any, UserBody, any> = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(StatusCodes.FORBIDDEN).jsonp({
      message: 'Username , Email and Password must be required!',
      requestPayload: req.body,
    });
  try {
    // Check email exist
    const user = await NoteUsersModel.findOne({ email }).exec();
    if (user)
      throw createHttpError(
        StatusCodes.ACCEPTED,
        `${email} already exist. Please try with other email.`
      );
    // Create a hash password
    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await NoteUsersModel.create({
      username,
      email,
      password: hashPwd,
    });

    // Query the database, excluding the 'password' field
    // const user = await User.findById(userId).select('-password');
    // Compare hash password and plain text
    // const plainTextPassword = 'admin@1234';
    // const isMatched = await bcrypt.compare(plainTextPassword, hasPwd);
    return res.status(StatusCodes.CREATED).jsonp({
      status: true,
      newUser,
    });
  } catch (error) {
    next(error);
  }
};
