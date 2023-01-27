import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/databaseConnect';
import { ICouponCreationAttributes, ICoupon } from '../../interfaces/coupon';

class Coupon extends Model<ICoupon, ICouponCreationAttributes> implements ICoupon {
  public id!: string;
  public name!: string;
  public expiry!: Date;
  public discount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    sequelize: sequelizeConnection,
    modelName: 'Coupons',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
);

export default Coupon;
