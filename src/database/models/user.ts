import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/databaseConnect';
import { Role } from '../../common/constants/role';
import { IUser, IUserCreationAttributes } from '../../interfaces/user';
import bcrypt from 'bcryptjs';

class User extends Model<IUser, IUserCreationAttributes> implements IUser {
  public password!: string;
  public id!: string;
  public firstname!: string;
  public lastname!: string;
  public favorites!: string[];
  public refreshToken!: string;
  public email!: string;
  public phone: string | null;
  public role!: Role;
  public blocked: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      defaultValue: null,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: Role.USER,
      allowNull: false,
      validate: {
        isIn: [Object.values(Role)]
      }
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: []
    },
    refreshToken: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: "Users",
    hooks: {
      beforeValidate: async (user) => {
        if (!user.password) return;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    defaultScope: {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'refreshToken']
      }
    },
    scopes: {
      withPassword: { attributes: { exclude: ['createdAt', 'updatedAt'] } }
    }
  }
);

export default User;
