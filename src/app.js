import dotenv from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';
// import helmet from 'helmet';

dotenv.config();

import './database';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import itemRoutes from './routes/itemRoutes';
import transactionRoutes from './routes/transactionRoutes';
import transactionItemRoutes from './routes/transactionItemRoutes';

const whiteList = [
  'http://localhost:3000',
  'https://dash.cumpacell.com'
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    // this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/transactions/', transactionRoutes);
    this.app.use('/items/', itemRoutes);
    this.app.use('/transactions/items/', transactionItemRoutes);
  }
}

export default new App().app;
