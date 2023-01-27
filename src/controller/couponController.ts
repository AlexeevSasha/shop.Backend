import { NextFunction, Request, Response } from 'express';
import CouponModel from '../database/models/coupon';
import { ICoupon } from '../interfaces/coupon';

class CouponController {
  public async create(req: Request<{}, {}, ICoupon>, res: Response, next: NextFunction) {
    try {
      const coupon = await CouponModel.create({...req.body, name: req.body?.name.toUpperCase()})
      res.send(coupon);
    } catch (error) {
      next(error);
    }
  }
  public async getAllCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const coupons = await CouponModel.findAndCountAll()
      res.send({
        count: coupons.count,
        coupons: coupons.rows
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CouponController