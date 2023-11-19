import express from 'express';
import { 
    createMovieController, 
    deleteMovieController, 
    getAMovieController, 
    getAllRatingForAMovieController, 
    getMoviesController,
    updateMovieController, 
} 
   from '../Controller/MovieController.js';

const router = express.Router();

router.post('/create', createMovieController);
router.get('/fetch/movies', getMoviesController);
router.get('/fetch/:id', getAMovieController);
router.patch('/modify/:id', updateMovieController);
router.delete('/remove/:id', deleteMovieController);
router.get('/fetch/:movie_id/ratings', getAllRatingForAMovieController);


export default router;