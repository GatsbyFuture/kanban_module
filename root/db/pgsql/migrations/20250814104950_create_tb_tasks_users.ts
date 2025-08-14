import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_TASKS_USERS,
                TB_COLUMNS_TASKS,
                TB_TASKS_ROLES
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_TASKS_USERS} table...`);

        await knex.schema.createTable(TB_TASKS_USERS, (t) => {
            t.increments('id').primary();

            t.integer('task_id')
                .references('id').inTable(TB_COLUMNS_TASKS)
                .onDelete('CASCADE')
                .notNullable();

            t.integer('user_id').notNullable(); // FK to users if you have one
            t.integer('role_id')
                .references('id').inTable(TB_TASKS_ROLES)
                .onDelete('RESTRICT')
                .defaultTo(null);

            t.timestamp('assigned_at').notNullable().defaultTo(knex.fn.now());

            t.unique(['task_id', 'user_id']);
            t.index(['user_id', 'role_id']);
        });

        console.log(`Created ${TB_TASKS_USERS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_TASKS_USERS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_TASKS_USERS);
    } catch (e) {
        console.error(`Error creating ${TB_TASKS_USERS} table:`, e);
    }
}