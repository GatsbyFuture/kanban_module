import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_BOARDS} table...`);

        await knex.schema.createTable(TB_BOARDS, (t) => {
            t.increments('id').primary();
            t.string('name', 160).notNullable();
            t.text('desc').defaultTo(null);
            t.integer('made_by').notNullable().index();
            t.boolean('is_private').notNullable().defaultTo(false);
            t.jsonb('meta').notNullable().defaultTo('{}');
            t.boolean('is_active').notNullable().defaultTo(false);
            t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
            t.index(['made_by', 'is_active']);
        });

        // this trigger function was created one times in this file then we can use it everywhere.
        await knex.raw(`
            CREATE OR REPLACE FUNCTION set_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
              NEW.updated_at = now();
              RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_BOARDS}_updated_at
            BEFORE UPDATE ON ${TB_BOARDS}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_BOARDS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_BOARDS);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS} table:`, e);
    }
}

