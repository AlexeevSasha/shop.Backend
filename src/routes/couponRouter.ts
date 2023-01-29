import { Router } from 'express';
import { pathRouter } from '../common/constants/path';
import { IsAdminMiddleware } from '../middlwares/isAdminMiddleware';
import { authMiddleware } from '../middlwares/authMiddleware';
import CouponCtrl from '../controller/couponController';

class CouponRouter {
  private readonly routers: Router;
  controller: CouponCtrl;

  constructor() {
    this.routers = Router();
    this.controller = new CouponCtrl();
  }

  get() {
    this.routers.route(pathRouter.coupon.create).post(authMiddleware, IsAdminMiddleware, this.controller.create);
    this.routers.route(pathRouter.coupon.allCoupons).get(this.controller.getAllCoupon);
    this.routers.route(pathRouter.coupon.update).put(authMiddleware, IsAdminMiddleware, this.controller.updateCoupon);
    this.routers.route(pathRouter.coupon.delete).delete(authMiddleware, IsAdminMiddleware, this.controller.deleteCoupon);
    return this.routers;
  }
}

export default CouponRouter;