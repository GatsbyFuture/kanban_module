import type {Knex} from "knex";
import {config} from '../../../config/config';
import path from "path";
import fs from "fs";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_FLOW_PLATFORMS
            },
            SEED_DATA: {
                FLOW_PLATFORMS_PATH
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_FLOW_PLATFORMS} table...`);

        await knex.schema.createTable(TB_FLOW_PLATFORMS, (t) => {
            t.increments('id').primary();
            t.string('code', 50).notNullable().unique(); // 'FACEBOOK','INSTAGRAM',...
            t.string('name', 100).notNullable();
            t.jsonb('meta').notNullable().defaultTo('{}'); // e.g. {icon:'fb', auth:'oauth2'}
            t.boolean('is_active').notNullable().defaultTo(true);
            t.integer('weight').notNullable().defaultTo(0);
            t.timestamps(true, true);
        });

        const file_path = path.resolve(__dirname, FLOW_PLATFORMS_PATH);
        const raw_data = fs.readFileSync(file_path, 'utf-8');
        const parsed = JSON.parse(raw_data);

        await knex(TB_FLOW_PLATFORMS).insert(parsed.values);

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_FLOW_PLATFORMS}_updated_at
            BEFORE UPDATE ON ${TB_FLOW_PLATFORMS}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_FLOW_PLATFORMS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_FLOW_PLATFORMS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_FLOW_PLATFORMS);
    } catch (e) {
        console.error(`Error creating ${TB_FLOW_PLATFORMS} table:`, e);
    }
}