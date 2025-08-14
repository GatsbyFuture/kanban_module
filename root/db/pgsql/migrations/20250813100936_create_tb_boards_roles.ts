import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS_ROLES
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_BOARDS_ROLES} table...`);

        await knex.schema.createTable(TB_BOARDS_ROLES, (t) => {
            t.increments('id').primary();
            t.string('code', 50).notNullable().unique(); // 'owner','admin','member','viewer'
            t.string('name', 100).notNullable();
            t.integer('weight').notNullable().defaultTo(0); // permission level/order [0;100]
            t.jsonb('meta').notNullable().defaultTo('{}');
            t.timestamps(true, true);
        });

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_BOARDS_ROLES}_updated_at
            BEFORE UPDATE ON ${TB_BOARDS_ROLES}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_BOARDS_ROLES} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS_ROLES} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_BOARDS_ROLES);
    } catch (e) {
        console.error(`Error creating ${TB_BOARDS_ROLES} table:`, e);
    }
}

