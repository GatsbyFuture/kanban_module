import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_TASKS_MESSAGES,
                TB_COLUMNS_TASKS,
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_TASKS_MESSAGES} table...`);

        await knex.schema.createTable(TB_TASKS_MESSAGES, (t) => {
            t.increments('id').primary();
            t.integer('task_id')
                .references('id').inTable(TB_COLUMNS_TASKS)
                .onDelete('CASCADE')
                .notNullable();
            t.integer('user_id').notNullable(); // FK if you want set it
            t.text('message').notNullable();
            t.jsonb('attachments').notNullable().defaultTo('[]');
            t.jsonb('meta').notNullable().defaultTo('{}'); // [edited, pinned, reactions]
            t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

            t.index(['task_id', 'user_id', 'created_at']);
        });
        
        console.log(`Created ${TB_TASKS_MESSAGES} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_TASKS_MESSAGES} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_TASKS_MESSAGES);
    } catch (e) {
        console.error(`Error creating ${TB_TASKS_MESSAGES} table:`, e);
    }
}