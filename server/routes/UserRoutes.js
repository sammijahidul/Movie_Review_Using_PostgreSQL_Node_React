import express from 'express';
import { getAllUserController, userCreateController } from '../Controller/UserController.js';

const router = express.Router();

router.post('/create', userCreateController);
router.get('/fetch/users', getAllUserController)

export default router;