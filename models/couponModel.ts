import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../database';
import { CouponModelT, CouponT } from '../interfaces/coupon';

class Coupon extends Model<CouponT, CouponModelT> {}

Coupon.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, isUppercase: true },
      unique: true
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { notEmpty: true }
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    }
  },
  {
    sequelize: sequelizeDB,
    freezeTableName: true,
    timestamps: true,
    modelName: 'coupons',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
);

export default Coupon;
