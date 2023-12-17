import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnection from './configs/dbConfig.js';
import router from './routes/index.js';
import { errorHandlerMiddleware } from './middlewares/errorMiddleware.js';

const app = express();
const PORT = 5000;

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

dbConnection();

app.use(cors('*'));
app.use(cookieParser());
app.use(express.json());

app.use('/', router);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
