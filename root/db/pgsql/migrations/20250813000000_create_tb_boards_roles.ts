import type {Knex} from "knex";
import {config} from '../../../config/config';
import path from "path";
import fs from "fs";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS_ROLES
            },
            SEED_DATA: {
                BOARD_ROLES_PATH
            }
        }
    },
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_BOARDS_ROLES} table...`);

        await knex.schema.createTable(TB_BOARDS_ROLES, (t) => {
            t.increments('id').primary();
            t.string('code', 50).notNullable().unique();
            t.string('name', 100).notNullable();
            t.integer('weight').notNullable().defaultTo(0); // permission level/order [0;100]
            t.jsonb('meta').notNullable().defaultTo('{}');
            t.timestamps(true, true);
        });

        const file_path = path.resolve(__dirname, BOARD_ROLES_PATH);
        const raw_data = fs.readFileSync(file_path, 'utf-8');
        const parsed = JSON.parse(raw_data);

        await knex(TB_BOARDS_ROLES).insert(parsed.values);

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

