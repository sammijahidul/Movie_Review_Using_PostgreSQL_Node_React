import express from 'express';
import { 
    createCommentController, 
    gettingAllCommentController 
} 
    from '../Controller/CommentController.js';

const router = express.Router();

router.post('/create', createCommentController);
router.get('/fetch/comments', gettingAllCommentController);


export default router;