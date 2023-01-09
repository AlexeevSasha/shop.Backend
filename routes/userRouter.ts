import { Router } from 'express';
import UserCtrl from '../controller/userController';

class UserRouter {
  private readonly routers: Router;
  controller: UserCtrl;

  constructor() {
    this.routers = Router();
    this.controller = new UserCtrl();
  }

  get() {
    this.routers.route('/create').post(this.controller.create);
    this.routers.route('/login').post(this.controller.login);
    return this.routers;
  }
}

export default UserRouter;
