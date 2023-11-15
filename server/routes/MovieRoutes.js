import express from 'express';
import { createAMovieController, getAMovieController, getAllMoviesController } from '../Controller/MovieController.js';

const router = express.Router();

router.post('/create', createAMovieController);
router.get('/fetch/movies', getAllMoviesController);
router.get('/fetch/:id', getAMovieController);

export default router;