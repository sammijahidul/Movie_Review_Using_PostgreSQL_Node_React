import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/UserRoutes.js';


dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

//routes
app.use('/api/v1/user', userRouter);

const PORT = process.env.PORT || 4002;

app.listen(PORT, ()=> {
    console.log(`App is listening at http://localhost:${PORT}`);
})