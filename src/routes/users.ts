import express from 'express';

import * as UsersController from '../controllers/users';
import { authVerify } from '../utils/common.util';

const router = express.Router();

// router.get('/', NotesController.getNotes);
// router.get('/:noteId', NotesController.getNoteById);
router.post('/', authVerify, UsersController.createUser);
router.post('/auth', UsersController.authUser);
// router.put('/:noteId', NotesController.updateNote);
// router.delete('/:noteId', NotesController.deleteNote);

export default router;
