import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelizeDB } from '../database';
import { UserModelT, UserT } from '../interfaces/user';

class User extends Model<UserT, UserModelT> {
  declare password: string;
  declare id: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true, notEmpty: true },
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: false
    }
  },
  {
    sequelize: sequelizeDB,
    freezeTableName: true,
    timestamps: true,
    modelName: 'users',
    hooks: {
      beforeValidate: async (user) => {
        if (!user.password) return;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    defaultScope: {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    },
    scopes: {
      withPassword: { attributes: { exclude: ['createdAt', 'updatedAt'] } }
    }
  }
);

export default User;
