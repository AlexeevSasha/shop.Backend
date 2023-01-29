import { Router } from 'express';
import ProductCtrl from '../controller/productController';
import { pathRouter } from '../common/constants/path';
import { IsAdminMiddleware } from '../middlwares/isAdminMiddleware';
import { authMiddleware } from '../middlwares/authMiddleware';
import uploadImagesMiddlewares from '../middlwares/uploadImages';

class ProductRouter {
  private readonly routers: Router;
  controller: ProductCtrl;

  constructor() {
    this.routers = Router();
    this.controller = new ProductCtrl();
  }

  get() {
    this.routers.route(pathRouter.product.create).post(authMiddleware, IsAdminMiddleware, this.controller.create);
    this.routers.route(pathRouter.product.allProduct).get(this.controller.getAllProduct);
    this.routers.route(pathRouter.product.productById).get(this.controller.getProductById);
    this.routers.route(pathRouter.product.delete).delete(authMiddleware, IsAdminMiddleware, this.controller.deleteProduct);
    this.routers.route(pathRouter.product.addToFavorites).post(authMiddleware, this.controller.addToFavorites);
    this.routers.route(pathRouter.product.deleteToFavorites).post(authMiddleware, this.controller.deleteToFavorites);
    this.routers.route(pathRouter.product.upload).post(authMiddleware, IsAdminMiddleware,
      uploadImagesMiddlewares.uploadImages().array('images',10),
      uploadImagesMiddlewares.imgResize(),
      this.controller.uploadImages)
    return this.routers;
  }
}

export default ProductRouter;