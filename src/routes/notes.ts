import express from 'express';

import * as NotesController from '../controllers/notes';

const router = express.Router();

router.get('/', NotesController.getNotes);
router.get('/:noteId', NotesController.getNoteById);
router.post('/', NotesController.createNote);
router.put('/:noteId', NotesController.updateNote);
router.delete('/:noteId', NotesController.deleteNote);

export default router;