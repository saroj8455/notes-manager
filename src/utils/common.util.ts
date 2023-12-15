import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export function generateFilename() {
  const today = new Date();
  const logsname =
    today.toLocaleDateString().split('/').join('_') + '_access.log';
  return logsname;
}

export function generateToken(payload: any, secretKey: any) {
  const token = jwt.sign({ payload }, secretKey, { expiresIn: '1h' });
  return token;
}

export function checkEmpty(input: any) {
  if (typeof input === 'undefined' || input == null || input.length < 1) {
    throw createHttpError(
      StatusCodes.BAD_REQUEST,
      `Please provide the correct value! : Your input is ${input}`
    );
  }
}

export function checkMongoObjectId(objectId: string) {
  if (!mongoose.isValidObjectId(objectId))
    throw createHttpError(
      StatusCodes.BAD_REQUEST,
      `Invalid ObjectId : ${objectId}. Provide correct one.`
    );
}
