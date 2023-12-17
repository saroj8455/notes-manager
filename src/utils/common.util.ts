import { NextFunction, Request, RequestHandler, Response } from 'express';
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

export const authVerify = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  // console.log(token)
  if (!token)
    return res.status(StatusCodes.UNAUTHORIZED).send({
      message: 'Access Denied',
    });
  try {
    const secretkey = process.env.JWTKEY ? process.env.JWTKEY : '';
    const verified = jwt.verify(token, secretkey);
    // console.log(verified)
    req.user = verified;
    next();
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).send({
      message: 'Invalid token',
    });
  }
};

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
