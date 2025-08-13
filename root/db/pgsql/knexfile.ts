import type {Knex} from 'knex';
import {config} from '../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            CONNECTION: {
                PG_HOST,
                PG_PORT,
                PG_USER,
                PG_PASS,
                PG_NAME
            }
        }
    }
} = config;

const knex_config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: PG_HOST,
            port: PG_PORT,
            user: PG_USER,
            password: PG_PASS,
            database: PG_NAME
        },
        pool: {min: 2, max: 10},
        migrations: {
            tableName: 'knex_migrations_clients',
            directory: './migrations',
            extension: 'ts'
        },
        seeds: {
            directory: './seeds'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: PG_HOST,
            port: PG_PORT,
            user: PG_USER,
            password: PG_PASS,
            database: PG_NAME,
            // ssl: {rejectUnauthorized: false}
        },
        pool: {min: 2, max: 10},
        migrations: {
            tableName: 'knex_migrations_calls',
            directory: './migrations',
            extension: 'js'
        },
        seeds: {
            directory: './seeds'
        }
    }
}

export default knex_config;