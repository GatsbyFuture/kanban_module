import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS,
                TB_BOARDS_USERS,
                TB_BOARDS_ROLES
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_BOARDS_USERS} table...`);

        await knex.schema.createTable(TB_BOARDS_USERS, (t) => {
            t.increments('id').primary();
            t.integer('board_id')
                .references('id').inTable(TB_BOARDS)
                .onDelete('CASCADE')
                .notNullable();
            t.integer('user_id').notNullable();
            t.integer('role_id',)
                .references('id').inTable(TB_BOARDS_ROLES)
                .onDelete('RESTRICT')
                .notNullable();
            t.jsonb('meta').notNullable().defaultTo('{}'); // notification, color theme, etc.
            t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            t.unique(['board_id', 'user_id']);
            t.index(['user_id', 'role_id']);
        });

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_BOARDS_USERS}_updated_at
            BEFORE UPDATE ON ${TB_BOARDS_USERS}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_BOARDS_USERS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS_USERS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_BOARDS_USERS);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS_USERS} table:`, e);
    }
}

