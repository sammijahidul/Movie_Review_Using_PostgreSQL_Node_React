import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/UserRoutes.js';
import movieRouter from './routes/MovieRoutes.js';
import ratingRouter from './routes/RattingRoutes.js';
import commentRouter from './routes/CommentRoutes.js';

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

//routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/movie', movieRouter);
app.use('/api/v1/movieRating', ratingRouter);
app.use('/api/v1/movieComment', commentRouter);

const PORT = process.env.PORT || 4002;

app.listen(PORT, ()=> {
    console.log(`App is listening at http://localhost:${PORT}`);
})