import { Router } from 'express';
import ProductCtrl from '../controller/productController';
import { pathRouter } from '../common/constants/path';
import { IsAdminMiddleware } from '../middlwares/isAdminMiddleware';
import { authMiddleware } from '../middlwares/authMiddleware';

class ProductRouter {
  private readonly routers: Router;
  controller: ProductCtrl;

  constructor() {
    this.routers = Router();
    this.controller = new ProductCtrl();
  }

  get() {
    this.routers.route(pathRouter.product.create).post(authMiddleware, IsAdminMiddleware, this.controller.create);
    this.routers.route(pathRouter.product.allProduct).get(authMiddleware, this.controller.getAllProduct);
    this.routers.route(pathRouter.product.productById).get(authMiddleware, this.controller.getProductById);
    this.routers.route(pathRouter.product.delete).delete(authMiddleware, IsAdminMiddleware, this.controller.deleteProduct);
    return this.routers;
  }
}

export default ProductRouter;