import { NextFunction, Request, RequestHandler, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import NoteModel from '../models/notes.model';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import {
  checkEmpty,
  checkMongoObjectId,
  generateToken,
} from '../utils/common.util';
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

export const authUser: RequestHandler<any, any, UserBody, any> = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const InputPassword = password;
  if (!username || !InputPassword)
    return res.status(StatusCodes.FORBIDDEN).jsonp({
      message: 'Username and Password must be required!',
      requestPayload: req.body,
    });
  try {
    // Check user already  exist
    const user = await NoteUsersModel.findOne({ username }).exec();
    if (!user)
      throw createHttpError(
        StatusCodes.ACCEPTED,
        `${username} incorrect!. Please check the correct username and password.`
      );

    // Query the database, excluding the 'password' field
    // const user = await User.findById(userId).select('-password');
    // Compare hash password and plain text
    // const plainTextPassword = 'admin@1234';
    const isMatched = await bcrypt.compare(InputPassword, user.password);
    if (!isMatched)
      throw createHttpError(
        StatusCodes.UNAUTHORIZED,
        `${username} : Check the correct password.`
      );
    const accessToken = generateToken(user.email, process.env.JWTKEY);
    // Omitting the 'password' field from the user object before sending the response
    const { password, ...userDataWithoutPassword } = user.toObject();
    // Set access_token to header
    res.header('Authorization', accessToken);
    return res.status(StatusCodes.CREATED).jsonp({
      status: true,
      data: { userDataWithoutPassword, access_token: accessToken },
    });
  } catch (error) {
    next(error);
  }
};
