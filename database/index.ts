import { Sequelize } from 'sequelize';

export const sequelizeDB = new Sequelize({
  database: 'shop',
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  logging: false,
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
