import express from 'express';
import { createRatingController, deleteARatingController, gettingARatingController, gettingAllRatingController, updateARatingController } from '../Controller/RatingController.js';


const router = express.Router();

router.post('/create', createRatingController);
router.get('/fetch/ratings', gettingAllRatingController);
router.get('/fetch/rating/:id', gettingARatingController);
router.patch('/update/rating/:id', updateARatingController);
router.delete('/remove/rating/:id', deleteARatingController);


export default router;