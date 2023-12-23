import { getContacts } from './../controllers/contact';
import express from 'express';

import * as ContactController from '../controllers/contact';

const router = express.Router();

router.get('/', ContactController.getContacts);
router.post('/', ContactController.createContact);

export default router;
