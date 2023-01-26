import { Router } from 'express';
import UserCtrl from '../controller/userController';
import { pathRouter } from '../common/constants/path';
import { IsAdminMiddleware } from '../middlwares/isAdminMiddleware';
import { authMiddleware } from '../middlwares/authMiddleware';

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
    this.routers.route(pathRouter.user.logout).get(authMiddleware, this.controller.logout);
    this.routers.route(pathRouter.user.changePassword).put(authMiddleware, this.controller.changePassword);
    this.routers.route(pathRouter.user.forgotPassword).post(this.controller.forgotPassword);
    this.routers.route(pathRouter.user.resetPassword).put(this.controller.resetPassword);
    this.routers.route(pathRouter.user.refresh).get(this.controller.refreshToken);
    this.routers.route(pathRouter.user.allUser).get(authMiddleware, this.controller.getAllUser);
    this.routers.route(pathRouter.user.userById).get(authMiddleware, this.controller.getUserById);
    this.routers.route(pathRouter.user.delete).delete(authMiddleware, this.controller.deleteUser);
    this.routers.route(pathRouter.user.update).put(authMiddleware, this.controller.updateUser);
    this.routers.route(pathRouter.user.block).put(authMiddleware, IsAdminMiddleware, this.controller.blockUser);
    return this.routers;
  }
}

export default UserRouter;
