import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/databaseConnect';
import { ICategory, ICategoryCreationAttributes } from '../../interfaces/category';

class Category extends Model<ICategory, ICategoryCreationAttributes> implements ICategory {
  public id!: string;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
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
      validate: { notEmpty: true },
      unique: true
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Categories',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
  }
);

export default Category;
