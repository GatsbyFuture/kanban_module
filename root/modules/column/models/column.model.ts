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
                TB_BOARDS_COLUMNS
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
        return this.fastify.pgsql(TB_BOARDS_COLUMNS).select("*")
            .where(query).first();
    }

    async readAll(query: Partial<QueryColumnDto>): Promise<IColumn[]> {
        return this.fastify.pgsql(TB_BOARDS_COLUMNS).select("*")
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