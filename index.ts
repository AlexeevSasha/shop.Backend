import 'dotenv/config';
import './models/association';
import express, { Express } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { sequelizeDB } from './database';
import { errorHandlerMiddleware } from './middlwares/errorMiddleware';
import UserRouters from './routes/userRouter';
import ProductRouter from './routes/productRouter';
import BlogRouter from './routes/blogRouter';
import CategoryRouter from './routes/categoryRouter';
import CouponRouter from './routes/couponRouter';


class App {
  port: number;
  app: Express;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8000;
  }

  private useMiddleware() {
    this.app.use(json());
    this.app.use(cors({ origin: ['http://localhost:5500'] }));
    this.app.use(cookieParser());
  }

  private useRoutes() {
    this.app.use('/api/user', new UserRouters().get());
    this.app.use('/api/product', new ProductRouter().get());
    this.app.use('/api/blog', new BlogRouter().get());
    this.app.use('/api/category', new CategoryRouter().get());
    this.app.use('/api/coupon', new CouponRouter().get());
  }

  private initDataBase() {
    sequelizeDB
      .sync()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`Server started on port ${this.port}`);
        });
      })
      .catch((err) => console.log(`Error: ${err}`));
  }

  public init() {
    this.useMiddleware();
    this.useRoutes();
    this.app.use(errorHandlerMiddleware);
    this.initDataBase();
  }
}

new App().init();
