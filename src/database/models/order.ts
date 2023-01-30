import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/databaseConnect';
import { IOrder, IOrderCreationAttributes } from '../../interfaces/order';
import { ORDER_STATUS } from '../../common/constants/order';

class Order extends Model<IOrder, IOrderCreationAttributes> implements IOrder {
  public id!: string;
  public products!: {
    products: string,
    count: number,
    color: string,
    price: number
  }[];
  public payment!: string;
  public status!: ORDER_STATUS;
  public orderBy: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    products: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: { notEmpty: true }
    },
    payment: {
      type: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ORDER_STATUS.NOT_PROCESSED,
      validate: {
        isIn: [Object.values(ORDER_STATUS)]
      }
    },
    orderBy: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: { notEmpty: true },
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Orders',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
);

export default Order;
