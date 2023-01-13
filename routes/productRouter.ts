import { Router } from 'express';
import ProductCtrl from '../controller/productController';
import { pathRouter } from '../common/constants/path';

class ProductRouter {
  private readonly routers: Router;
  controller: ProductCtrl;

  constructor() {
    this.routers = Router();
    this.controller = new ProductCtrl();
  }

  get() {
    this.routers.route(pathRouter.product.create).post(this.controller.create)
    return this.routers;
  }
}

export default ProductRouter