import { Router } from 'express';
import { pathRouter } from '../common/constants/path';
import { IsAdminMiddleware } from '../middlwares/isAdminMiddleware';
import { authMiddleware } from '../middlwares/authMiddleware';
import CategoryCtrl from '../controller/categoryController';

class CategoryRouter {
  private readonly routers: Router;
  controller: CategoryCtrl;

  constructor() {
    this.routers = Router();
    this.controller = new CategoryCtrl();
  }

  get() {
    this.routers.route(pathRouter.category.create).post(authMiddleware, IsAdminMiddleware, this.controller.createCategory);
    this.routers.route(pathRouter.category.update).put(authMiddleware, IsAdminMiddleware, this.controller.updateCategory);
    this.routers.route(pathRouter.category.delete).delete(authMiddleware, IsAdminMiddleware, this.controller.deleteCategory);
    this.routers.route(pathRouter.category.categoryById).get(this.controller.getCategoryById);
    this.routers.route(pathRouter.category.allCategories).get(this.controller.getAllCategories);
    return this.routers;
  }
}

export default CategoryRouter;