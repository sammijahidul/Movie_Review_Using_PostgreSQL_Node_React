import express from 'express';
import { 
    createCommentController, 
    deleteCommentController, 
    gettingACommentController, 
    gettingAllCommentController, 
    updateCommentController
} 
    from '../Controller/CommentController.js';

const router = express.Router();

router.post('/create', createCommentController);
router.get('/fetch/comments', gettingAllCommentController);
router.get('/fetch/comment/:id', gettingACommentController);
router.patch('/update/comment/:id', updateCommentController);
router.delete('/remove/comment/:id', deleteCommentController);


export default router;