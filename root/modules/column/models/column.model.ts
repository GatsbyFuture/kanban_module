import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IColumn} from "../interfaces/column.interface";

import {CreateColumnDto} from "../dto/create.column.dto";
import {QueryColumnDto} from "../dto/query.column.dto";
import {UpdateColumnDto} from "../dto/update.column.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS_COLUMNS,
                TB_COLUMNS_TASKS,
            }
        }
    }
} = config;

export class ColumnModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(create: CreateColumnDto): Promise<IColumn> {
        return this.fastify.pgsql(TB_BOARDS_COLUMNS).insert(create)
            .returning('*').then(rows => rows[0]);
    }

    async readOne(query: Partial<QueryColumnDto>): Promise<IColumn | undefined> {
        return this.fastify.pgsql(`${TB_BOARDS_COLUMNS} as cl`)
            .select([
                'cl.*',
                this.fastify.pgsql.raw(`COALESCE(clt.tasks, '[]'::jsonb) as tasks`),
            ])
            .leftJoin(this.fastify.pgsql.raw(`
             LATERAL (
                SELECT jsonb_agg(
                         jsonb_build_object(
                           'id', clt.id,
                           
                           'title', clt.title,
                           'desc', clt.desc,
                           
                           'priority_id', clt.priority_id,
                           
                           'start_date', clt.start_date,
                           'due_date', clt.due_date,
                           'completed_at', clt.completed_at,
                           
                           'order_rank', clt.order_rank,
                           
                           'external_refs', clt.external_refs,
                           'contact', clt.contact,
                           'has_lead', clt.has_lead,
                           'lead_id', clt.lead_id,
                           
                           'labels', clt.labels,
                           'attachments', clt.attachments,
                           'checklist', clt.checklist,
                           
                           'made_by', clt.made_by,
                           'updated_by', clt.updated_by,
                           
                           'meta', clt.meta,
                           
                           'is_active', clt.is_active,
                           'updated_at', clt.updated_at,
                           'created_at', clt.created_at
                         )
                         ORDER BY clt.order_rank
                       ) AS tasks
                FROM ${TB_COLUMNS_TASKS} clt
                WHERE clt.column_id = cl.id
             ) clt ON TRUE
            `))
            .where(query).first();
    }

    async readAll(query: Partial<QueryColumnDto>): Promise<IColumn[]> {
        return this.fastify.pgsql(`${TB_BOARDS_COLUMNS} as cl`)
            .select([
                'cl.*',
                this.fastify.pgsql.raw(`COALESCE(clt.tasks, '[]'::jsonb) as tasks`),
            ])
            .leftJoin(this.fastify.pgsql.raw(`
             LATERAL (
                SELECT jsonb_agg(
                         jsonb_build_object(
                           'id', clt.id,
                           
                           'title', clt.title,
                           'desc', clt.desc,
                           
                           'priority_id', clt.priority_id,
                           
                           'start_date', clt.start_date,
                           'due_date', clt.due_date,
                           'completed_at', clt.completed_at,
                           
                           'order_rank', clt.order_rank,
                           
                           'external_refs', clt.external_refs,
                           'contact', clt.contact,
                           'has_lead', clt.has_lead,
                           'lead_id', clt.lead_id,
                           
                           'labels', clt.labels,
                           'attachments', clt.attachments,
                           'checklist', clt.checklist,
                           
                           'made_by', clt.made_by,
                           'updated_by', clt.updated_by,
                           
                           'meta', clt.meta,
                           
                           'is_active', clt.is_active,
                           'updated_at', clt.updated_at,
                           'created_at', clt.created_at
                         )
                         ORDER BY clt.order_rank
                       ) AS tasks
                FROM ${TB_COLUMNS_TASKS} clt
                WHERE clt.column_id = cl.id
             ) clt ON TRUE
            `))
            .where(query);
    }

    async update(query: Partial<QueryColumnDto>, update: UpdateColumnDto): Promise<IColumn[]> {
        return this.fastify.pgsql(TB_BOARDS_COLUMNS).update(update)
            .where(query).returning('*');
    }

    async delete(ids: number[]): Promise<Partial<IColumn>[]> {
        return this.fastify.pgsql(TB_BOARDS_COLUMNS).whereIn('id', ids)
            .del().returning(['title', 'position']);
    }
}