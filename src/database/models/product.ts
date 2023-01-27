import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/databaseConnect';
import { ProductT } from '../../interfaces/product';

class Products extends Model<ProductT> {
  public id!: string;
  public title!: string;
  public slug!: string;
  public brand: string | null;
  public description!: string;
  public price: number;
  public oldPrice: number | null;
  public quantity: number;
  public images: string[];
  public sold: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Products.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true, isLowercase: true },
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: { notEmpty: true }
    },
    oldPrice: {
      type: DataTypes.DOUBLE,
      defaultValue: null
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    brand: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'Products',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt', 'sold'] }
    }
  }
);

export default Products;
