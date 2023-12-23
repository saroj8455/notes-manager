import { NextFunction, Request, RequestHandler, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import ContactForm, { IContactForm } from '../models/contactform.model';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { checkEmpty, checkMongoObjectId } from '../utils/common.util';
import Joi from 'joi';

export const getContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts = await ContactForm.find({}).exec();
    res.status(StatusCodes.OK).jsonp({
      status: 'success',
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Define type for create body
export const createContact: RequestHandler<
  any,
  any,
  IContactForm,
  any
> = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, message } = req.body;
  const contactSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });

  try {
    const { error } = contactSchema.validate(req.body);

    // validate userInput
    if (error) {
      return next(createHttpError(StatusCodes.UNPROCESSABLE_ENTITY, error));
    }

    const newContact = await ContactForm.create({
      name,
      email,
      message,
    });
    return res.status(StatusCodes.CREATED).jsonp({
      status: true,
      newContact,
    });
  } catch (error) {
    next(error);
  }
};
