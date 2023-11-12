import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import query from './db/index.js';

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());


const PORT = process.env.PORT || 4002;

app.listen(PORT, ()=> {
    console.log(`App is listening at http://localhost:${PORT}`);
})