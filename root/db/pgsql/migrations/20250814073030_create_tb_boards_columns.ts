import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS,
                TB_BOARDS_COLUMNS
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_BOARDS_COLUMNS} table...`);

        await knex.schema.createTable(TB_BOARDS_COLUMNS, (t) => {
            t.increments('id').primary();
            t.integer('board_id')
                .references('id').inTable(TB_BOARDS)
                .onDelete('CASCADE')
                .notNullable();
            t.string('title', 120).notNullable();
            t.integer('position').notNullable().defaultTo(0);
            t.integer('wip_limit').defaultTo(null);
            t.boolean('is_backlog').notNullable().defaultTo(false);
            t.boolean('is_done').notNullable().defaultTo(false);
            t.boolean('is_active').notNullable().defaultTo(true);
            t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

            // avoid duplicate column names per board
            t.unique(['board_id', 'title']);
            t.index(['board_id', 'position']);
        });

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_BOARDS_COLUMNS}_updated_at
            BEFORE UPDATE ON ${TB_BOARDS_COLUMNS}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_BOARDS_COLUMNS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS_COLUMNS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_BOARDS_COLUMNS);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS_COLUMNS} table:`, e);
    }
}