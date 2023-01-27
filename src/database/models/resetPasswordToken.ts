import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from '../../config/databaseConnect';
import { ResetPassword } from '../../interfaces/resetPassword';

class ResetPasswordToken extends Model<ResetPassword> {}

ResetPasswordToken.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: { notEmpty: true },
      primaryKey: true,
      references: {
        model: 'Users',
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
    sequelize: sequelizeConnection,
    tableName: 'ResetPasswordTokens'
  }
);

ResetPasswordToken.removeAttribute('id');

export default ResetPasswordToken;
