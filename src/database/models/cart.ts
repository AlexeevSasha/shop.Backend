import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/databaseConnect';
import { ICart, ICartCreationAttributes } from '../../interfaces/cart';

class Cart extends Model<ICart, ICartCreationAttributes> implements ICart {
  public id!: string;
  public products!: {
    products: string,
    count: number,
    color: string,
    price: number
  }[];
  public cartTotal!: number;
  public cartBy!: string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cart.init(
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
    cartTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true },
    },
    cartBy: {
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
    modelName: 'Carts',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
);

export default Cart;
