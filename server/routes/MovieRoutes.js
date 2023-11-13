import express from 'express';
import { createAMovieController } from '../Controller/MovieController.js';

const router = express.Router();

router.post('/create', createAMovieController);

export default router;