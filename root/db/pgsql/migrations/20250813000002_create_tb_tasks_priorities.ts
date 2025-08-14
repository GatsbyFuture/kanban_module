import type {Knex} from "knex";
import {config} from '../../../config/config';
import path from "path";
import fs from "fs";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_TASKS_PRIORITIES
            },
            SEED_DATA: {
                TASK_PRIORITIES_PATH
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_TASKS_PRIORITIES} table...`);

        await knex.schema.createTable(TB_TASKS_PRIORITIES, (t) => {
            t.increments('id').primary();
            t.string('code', 50).notNullable().unique(); // 'low','normal','high','urgent'
            t.string('name', 100).notNullable();
            t.integer('weight').notNullable().defaultTo(0); // sorting by importance
            t.jsonb('meta').notNullable().defaultTo('{}');
            t.timestamps(true, true);
        });

        const file_path = path.resolve(__dirname, TASK_PRIORITIES_PATH);
        const raw_data = fs.readFileSync(file_path, 'utf-8');
        const parsed = JSON.parse(raw_data);

        await knex(TB_TASKS_PRIORITIES).insert(parsed.values);

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_TASKS_PRIORITIES}_updated_at
            BEFORE UPDATE ON ${TB_TASKS_PRIORITIES}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_TASKS_PRIORITIES} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_TASKS_PRIORITIES} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_TASKS_PRIORITIES);
    } catch (e) {
        console.error(`Error creating ${TB_TASKS_PRIORITIES} table:`, e);
    }
}