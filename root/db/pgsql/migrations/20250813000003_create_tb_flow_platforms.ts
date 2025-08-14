import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_FLOW_PLATFORMS
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

        await knex(TB_FLOW_PLATFORMS).insert([
            {code: 'FACEBOOK', name: 'Facebook', weight: 100},
            {code: 'INSTAGRAM', name: 'Instagram', weight: 90},
            {code: 'TELEGRAM', name: 'Telegram', weight: 80},
            {code: 'YOUTUBE', name: 'YouTube', weight: 70},
            {code: 'WHATSAPP', name: 'WhatsApp', weight: 60},
            {code: 'OTHER', name: 'Other', weight: 0},
        ]).onConflict('code').ignore();

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