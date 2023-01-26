import { DataTypes, Model } from 'sequelize';
import { sequelizeDB } from '../database';
import { ResetPassword } from '../interfaces/resetPassword';

class ResetPasswordToken extends Model<ResetPassword> {}

ResetPasswordToken.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: { notEmpty: true },
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tokenExpires: {
      type: DataTypes.BIGINT,
      defaultValue: Date.now() + 3600000
    }
  },
  {
    sequelize: sequelizeDB,
    freezeTableName: true,
    timestamps: true,
    modelName: 'resetPasswordTokens'
  }
);

ResetPasswordToken.removeAttribute('id');

export default ResetPasswordToken;
