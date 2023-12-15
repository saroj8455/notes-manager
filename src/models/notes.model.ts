import { Document, Schema, model } from 'mongoose';

// Interface representing the user structure
interface Note extends Document {
  title: string;
  text: string;
  // You can add other fields as needed
}

// Define a mongoose schema based on the interface
const NoteSchema = new Schema<Note>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    // Define other schema fields here
  },
  {
    timestamps: true,
  }
);

// Create and export the Mongoose model
const NoteModel = model<Note>('Note', NoteSchema);

export default NoteModel;
