import express from 'express';

import * as UsersController from '../controllers/users';

const router = express.Router();

// router.get('/', NotesController.getNotes);
// router.get('/:noteId', NotesController.getNoteById);
router.post('/', UsersController.createUser);
// router.put('/:noteId', NotesController.updateNote);
// router.delete('/:noteId', NotesController.deleteNote);

export default router;
