import express from 'express';
import { 
    createAMovieController, 
    deleteAMovieController, 
    getAMovieController, 
    getAllMoviesController, 
    updateAMovieController 
} from '../Controller/MovieController.js';

const router = express.Router();

router.post('/create', createAMovieController);
router.get('/fetch/movies', getAllMoviesController);
router.get('/fetch/:id', getAMovieController);
router.patch('/modify/:id', updateAMovieController);
router.delete('/remove/:id', deleteAMovieController);

export default router;