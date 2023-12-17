import { Schema, model, Document } from 'mongoose';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Define the User interface representing a document in MongoDB
interface NoteUsers extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Define the schema for the User model
const userSchema = new Schema<NoteUsers>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, 'Invalid email format'], // Custom validation for email format
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the User model
const NoteUsersModel = model<NoteUsers>('NoteUsers', userSchema);

export default NoteUsersModel;
