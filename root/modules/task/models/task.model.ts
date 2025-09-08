import type {FastifyInstance} from "fastify";
import {ITask} from "../interfaces/task.interface";

import {config} from "../../../config/config";

import {CreateTaskDto} from "../dto/create.task.dto";
import {QueryTaskDto} from "../dto/query.task.dto";
import {UpdateTaskDto} from "../dto/update.task.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_COLUMNS_TASKS,
                TB_TASKS_USERS,
                TB_TASKS_MESSAGES,
                TB_TASKS_PRIORITIES
            }
        }
    }
} = config;

export class TaskModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createTaskDto: Partial<CreateTaskDto>): Promise<ITask> {
        return this.fastify.pgsql(TB_COLUMNS_TASKS).insert(createTaskDto)
            .returning('*').then(rows => rows[0]);
    }

    // async readOne(query: Partial<QueryTaskDto>): Promise<ITask | undefined> {
    //     return this.fastify.pgsql(`${TB_COLUMNS_TASKS} as t`)
    //         .select(['*'])
    //         .leftJoin(`${TB_TASKS_USERS} as tu`, 'tu.task_id', 't.id')
    //         .leftJoin(`${TB_TASKS_MESSAGES} as tm`, 'tm.task_id', 'tm.id')
    //         .where(query).first();
    // }

    async readOne(query: Partial<QueryTaskDto>): Promise<ITask | undefined> {
        return this.fastify.pgsql(`${TB_COLUMNS_TASKS} as t`)
            .select([
                't.*',
                this.fastify.pgsql.raw(`COALESCE((to_jsonb(p) - 'id'), '{}'::jsonb) AS priority`),
                this.fastify.pgsql.raw(`COALESCE(u.users, '[]'::jsonb) as users`),
                this.fastify.pgsql.raw(`COALESCE(m.messages, '[]'::jsonb) as messages`)
            ])
            .leftJoin(this.fastify.pgsql.raw(`
              LATERAL (
                SELECT jsonb_agg(
                         jsonb_build_object(
                           'id', tu.id,
                           'user_id', tu.user_id,
                           'role', tu.role_id,
                           'meta', tu.meta,
                           'assigned_at', tu.assigned_at
                         )
                         ORDER BY tu.assigned_at
                       ) AS users
                FROM ${TB_TASKS_USERS} tu
                WHERE tu.task_id = t.id
              ) u ON TRUE
            `))
            .leftJoin(this.fastify.pgsql.raw(`
              LATERAL (
                SELECT jsonb_agg(
                         jsonb_build_object(
                           'id', tm.id,
                           'user_id', tm.user_id,
                           'message', tm.message,
                           'attachments', tm.attachments,
                           'meta', tm.meta,
                           'created_at', tm.created_at,
                           'updated_at', tm.updated_at
                         )
                         ORDER BY tm.created_at
                       ) AS messages
                FROM ${TB_TASKS_MESSAGES} tm
                WHERE tm.task_id = t.id
              ) m ON TRUE
              `))
            .leftJoin(`${TB_TASKS_PRIORITIES} as p`, 'p.id', 't.priority_id')
            .modify((qb) => {
                if ((query as any)?.id !== undefined) {
                    qb.where('t.id', (query as any).id);
                    const {id, ...rest} = (query as any);
                    if (Object.keys(rest).length) qb.andWhere(rest);
                } else {
                    qb.where(query);
                }
            })
            .first();
    }

    async readAll(query: Partial<QueryTaskDto>): Promise<ITask[]> {
        return this.fastify.pgsql(`${TB_COLUMNS_TASKS} as t`)
            .select([
                't.*',
                this.fastify.pgsql.raw(`COALESCE((to_jsonb(p) - 'id'), '{}'::jsonb) AS priority`),
                this.fastify.pgsql.raw(`COALESCE(u.users, '[]'::jsonb) as users`),
                this.fastify.pgsql.raw(`COALESCE(m.messages, '[]'::jsonb) as messages`)
            ])
            .leftJoin(this.fastify.pgsql.raw(`
              LATERAL (
                SELECT jsonb_agg(
                         jsonb_build_object(
                           'id', tu.id,
                           'user_id', tu.user_id,
                           'role', tu.role_id,
                           'meta', tu.meta,
                           'assigned_at', tu.assigned_at
                         )
                         ORDER BY tu.assigned_at
                       ) AS users
                FROM ${TB_TASKS_USERS} tu
                WHERE tu.task_id = t.id
              ) u ON TRUE
            `))
            .leftJoin(this.fastify.pgsql.raw(`
              LATERAL (
                SELECT jsonb_agg(
                         jsonb_build_object(
                           'id', tm.id,
                           'user_id', tm.user_id,
                           'message', tm.message,
                           'attachments', tm.attachments,
                           'meta', tm.meta,
                           'created_at', tm.created_at,
                           'updated_at', tm.updated_at
                         )
                         ORDER BY tm.created_at
                       ) AS messages
                FROM ${TB_TASKS_MESSAGES} tm
                WHERE tm.task_id = t.id
              ) m ON TRUE
              `))
            .leftJoin(`${TB_TASKS_PRIORITIES} as p`, 'p.id', 't.priority_id')
            .modify((qb) => {
                if ((query as any)?.id !== undefined) {
                    qb.where('t.id', (query as any).id);
                    const {id, ...rest} = (query as any);
                    if (Object.keys(rest).length) qb.andWhere(rest);
                } else {
                    qb.where(query);
                }
            });
    }

    async update(query: Partial<QueryTaskDto>, update: UpdateTaskDto): Promise<ITask[]> {
        return this.fastify.pgsql(TB_COLUMNS_TASKS).update(update)
            .where(query).returning('*');
    }

    async deleteMany(ids: number[]): Promise<Partial<ITask>[]> {
        return this.fastify.pgsql(TB_COLUMNS_TASKS).whereIn('id', ids)
            .del().returning(['title', 'order_rank', 'updated_by']);
    }
}