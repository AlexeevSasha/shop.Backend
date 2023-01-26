import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../database';
import { BlogModelT, BlogT } from '../interfaces/blog';

class Blogs extends Model<BlogT, BlogModelT> {}

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
    sequelize: sequelizeDB,
    freezeTableName: true,
    timestamps: true,
    modelName: 'blogs',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
);

export default Blogs;
