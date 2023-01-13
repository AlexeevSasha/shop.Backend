import { Router } from 'express';
import UserCtrl from '../controller/userController';
import { pathRouter } from '../common/constants/path';
import { IsAdminMiddleware } from '../middlwares/isAdminMiddleware';

class UserRouter {
  private readonly routers: Router;
  controller: UserCtrl;

  constructor() {
    this.routers = Router();
    this.controller = new UserCtrl();
  }

  get() {
    this.routers.route(pathRouter.user.create).post(this.controller.create);
    this.routers.route(pathRouter.user.login).post(this.controller.login);
    this.routers.route(pathRouter.user.logout).get(this.controller.logout);
    this.routers.route(pathRouter.user.refresh).get(this.controller.refreshToken);
    this.routers.route(pathRouter.user.allUser).get(this.controller.getAllUser);
    this.routers.route(pathRouter.user.userById).get(this.controller.getUserById);
    this.routers.route(pathRouter.user.delete).delete(this.controller.deleteUser);
    this.routers.route(pathRouter.user.update).put(this.controller.updateUser);
    this.routers.route(pathRouter.user.block).put(IsAdminMiddleware, this.controller.blockUser);
    return this.routers;
  }
}

export default UserRouter;
