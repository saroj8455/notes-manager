import mongoose, { Document, Schema } from 'mongoose';

export interface IContactForm extends Document {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ContactFormSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactForm = mongoose.model<IContactForm>(
  'ContactForm',
  ContactFormSchema
);

export default ContactForm;
