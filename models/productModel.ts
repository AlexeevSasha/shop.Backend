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
      validate: { notEmpty: true },
      unique: true,
      get() {
        return this.getDataValue('slug').toLowerCase();
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    price: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    oldPrice: {
      type: DataTypes.NUMBER,
      defaultValue: null
    },
    quantity: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: { notEmpty: true }
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false,
      validate: { notEmpty: true }
    },
    brand: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    sold: {
      type: DataTypes.NUMBER,
      defaultValue: 0,
      allowNull: false,
      validate: { notEmpty: true }
    }
  },
  {
    sequelize: sequelizeDB,
    freezeTableName: true,
    timestamps: true,
    modelName: 'products',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
);

export default Products;
