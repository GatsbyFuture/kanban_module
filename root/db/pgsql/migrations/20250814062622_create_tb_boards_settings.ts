import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS,
                TB_BOARDS_SETTINGS
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_BOARDS_SETTINGS} table...`);

        await knex.schema.createTable(TB_BOARDS_SETTINGS, (t) => {
            t.increments('id').primary();
            t.integer('board_id').notNullable().unique()
                .references('id').inTable(TB_BOARDS)
                .onDelete('CASCADE')
                .notNullable();
            t.string('color', 24).defaultTo(null);

            // we can control by rows in future
            t.boolean('allow_swimlanes').notNullable().defaultTo(false);

            // how much column we can collect in.
            t.integer('clm_limits').defaultTo(null);
            t.boolean('auto_archive_done').notNullable().defaultTo(false);
            t.integer('auto_archive_days').defaultTo(null);

            // we can save [board-level, color, background img, ...]
            t.jsonb('meta').notNullable().defaultTo('{}');
            t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        });

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_BOARDS_SETTINGS}_updated_at
            BEFORE UPDATE ON ${TB_BOARDS_SETTINGS}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_BOARDS_SETTINGS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS_SETTINGS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_BOARDS_SETTINGS);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS_SETTINGS} table:`, e);
    }
}

