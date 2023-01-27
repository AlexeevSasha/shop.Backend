import { Optional } from 'sequelize';

export interface ICoupon {
  id: string;
  name: string;
  expiry: Date;
  discount: number;
}

export interface ICouponCreationAttributes extends Optional<ICoupon, 'id'> {}
