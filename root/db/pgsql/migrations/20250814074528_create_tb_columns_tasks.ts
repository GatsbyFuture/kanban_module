import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS,
                TB_BOARDS_COLUMNS,
                TB_COLUMNS_TASKS,
                TB_TASKS_PRIORITIES,
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_COLUMNS_TASKS} table...`);

        await knex.schema.createTable(TB_COLUMNS_TASKS, (t) => {
            t.increments('id').primary();

            t.integer('board_id').notNullable()
                .references('id').inTable(TB_BOARDS)
                .onDelete('CASCADE');
            t.integer('column_id').notNullable()
                .references('id').inTable(TB_BOARDS_COLUMNS)
                .onDelete('CASCADE');

            t.string('title', 200).notNullable();
            t.text('desc').defaultTo(null);

            t.integer('priority_id')
                .references('id').inTable(TB_TASKS_PRIORITIES)
                .onDelete('RESTRICT')
                .defaultTo(null);

            t.date('start_date');
            t.date('due_date');
            t.timestamp('completed_at');

            // Drag order (decimal lets you insert between two tasks without reindexing all)
            t.decimal('order_rank', 20, 10).notNullable().defaultTo(0);

            t.jsonb('external_refs').notNullable().defaultTo('{}'); // {messageId, postId, chatId,...}
            t.jsonb('contact').notNullable().defaultTo('{}'); // {name, phone, username, ...}
            t.boolean('has_lead').notNullable().defaultTo(false);
            t.integer('lead_id').defaultTo(null); // FK reference with lead if exist...

            // Labels & attachments & checklist
            t.specificType('labels', 'text[]').notNullable().defaultTo('{}');
            t.jsonb('attachments').notNullable().defaultTo('[]'); // [{name,url,size}]
            t.jsonb('checklist').notNullable().defaultTo('[]'); // [{id,text,done}]

            // Audit
            t.integer('made_by').notNullable();
            t.jsonb('updated_by').defaultTo('{}');

            t.jsonb('meta').notNullable().defaultTo('{}');

            t.boolean('is_active').notNullable().defaultTo(false);
            t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
            t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

            t.index(['board_id', 'column_id']);
            t.index(['has_lead', 'due_date']);
            t.index(['order_rank']);
        });

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_COLUMNS_TASKS}_updated_at
            BEFORE UPDATE ON ${TB_COLUMNS_TASKS}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_COLUMNS_TASKS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_COLUMNS_TASKS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_COLUMNS_TASKS);
    } catch (e) {
        console.error(`Error creating ${TB_COLUMNS_TASKS} table:`, e);
    }
}