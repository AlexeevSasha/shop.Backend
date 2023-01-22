import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../database';
import { ProductT } from '../interfaces/product';

class Products extends Model<ProductT> {}

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
      type: DataTypes.INTEGER,
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
    sequelize: sequelizeDB,
    freezeTableName: true,
    timestamps: true,
    modelName: 'products',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt', 'sold'] }
    }
  }
);

export default Products;
