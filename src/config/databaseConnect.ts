import { Sequelize } from "sequelize";
import 'dotenv/config';

const namePG = process.env.PG_NAME as string;
const hostPG = process.env.PG_HOST;
const userPG = process.env.PG_USER as string;
const passwordPG = process.env.PG_PASSWORD;
const dialectPG = "postgres";

const sequelizeConnection = new Sequelize(namePG, userPG, passwordPG, {
  host: hostPG,
  dialect: dialectPG
});

export default sequelizeConnection;