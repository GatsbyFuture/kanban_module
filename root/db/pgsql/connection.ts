import knex from 'knex';
import dotenv from 'dotenv';
import knex_config from "./knexfile";

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const pgsql = knex(knex_config[env]);

export default pgsql;