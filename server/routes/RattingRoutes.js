import express from 'express';
import { createRatingController } from '../Controller/RatingController.js';


const router = express.Router();

router.post('/create', createRatingController);

export default router;