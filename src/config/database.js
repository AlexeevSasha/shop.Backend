require('dotenv').config();

module.exports = {
  development: {
    database: process.env.PG_NAME,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: 5432
  },
  test: {
    database: process.env.PG_NAME,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: 5432
  },
  production: {
    database: process.env.PG_NAME,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: 5432
  }
};
