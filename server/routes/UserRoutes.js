import express from 'express';
import { 
    deleteAUserController,
    getAUserController, 
    getAllUserController, 
    updateAUserController, 
    userCreateController 
} from '../Controller/UserController.js';

const router = express.Router();

router.post('/create', userCreateController);
router.get('/fetch/users', getAllUserController);
router.get('/fetch/:id', getAUserController);
router.patch('/modify/:id', updateAUserController);
router.delete('/remove/:id', deleteAUserController);

export default router;