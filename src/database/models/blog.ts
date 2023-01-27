import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/databaseConnect';
import {  IBlog, IBlogCreationAttributes } from '../../interfaces/blog';

class Blogs extends Model<IBlog, IBlogCreationAttributes> implements IBlog{
  public id!: string;
  public title!: string;
  public description!: string;
  public category!: string;
  public views!: number;
  public likes!: string[];
  public dislikes!: string[];
  public image: string | null;
  public author!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Blogs.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    dislikes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: 'Admin'
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Blogs',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
);

export default Blogs;
