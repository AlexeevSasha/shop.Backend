import 'dotenv/config';
import express, { Express } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { sequelizeDB } from './database';
import { errorHandlerMiddleware } from './middlwares/errors';
import UserRouters from './routes/userRouter';

class App {
  port: number;
  app: Express;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8000;
  }

  private useMiddleware() {
    this.app.use(errorHandlerMiddleware);
  }

  private useRoutes() {
    this.app.use('/api/user', new UserRouters().get());
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
    this.app.use(json());
    this.app.use(cors({ origin: ['http://localhost:5500'] }));
    this.useRoutes();
    this.useMiddleware();
    this.initDataBase();
  }
}

new App().init();
