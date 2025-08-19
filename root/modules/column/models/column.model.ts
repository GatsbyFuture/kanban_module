import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IColumn} from "../interfaces/column.interface";

import {CreateColumnDto} from "../dto/create.column.dto";
import {QueryColumnDto} from "../dto/query.column.dto";

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

    async create(createColumnDto: CreateColumnDto): Promise<IColumn> {
        return this.fastify.pgsql(TB_BOARDS_COLUMNS).insert(createColumnDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOne(query: Partial<QueryColumnDto>): Promise<IColumn | undefined> {
        return this.fastify.pgsql(TB_BOARDS_COLUMNS).select("*")
            .where(query).first();
    }
}