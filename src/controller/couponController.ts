import { NextFunction, Request, Response } from 'express';
import CouponModel from '../database/models/coupon';
import { ICoupon } from '../interfaces/coupon';
import { BadRequestError } from '../common/error';
import { returnResponseMessage } from '../common/utils/returnResponseMessage';

class CouponController {
  public async create(req: Request<{}, {}, ICoupon>, res: Response, next: NextFunction) {
    try {
      const coupon = await CouponModel.create({...req.body, name: req.body?.name.toUpperCase()})
      res.send(coupon);
    } catch (error) {
      next(error);
    }
  }
  public async getAllCoupon(req: Request<{ id: string }>, res: Response, next: NextFunction) {
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
  public async updateCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await CouponModel.update({
        ...req.body
      }, { where: { id } });

      if (!user) throw new BadRequestError('Coupon not found');

      res.send(user);
    } catch (error) {
      next(error);
    }
  }
  public async deleteCoupon(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteCoupon = await CouponModel.destroy({ where: { id } });

      if (deleteCoupon === 0) throw new BadRequestError('Error when deleting a coupon');

      returnResponseMessage(res, 200, 'Coupon deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export default CouponController