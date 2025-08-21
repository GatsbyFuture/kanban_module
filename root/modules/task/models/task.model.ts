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
                TB_COLUMNS_TASKS
            }
        }
    }
} = config;

export class TaskModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createTaskDto: CreateTaskDto): Promise<ITask> {
        return this.fastify.pgsql(TB_COLUMNS_TASKS).insert(createTaskDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOne(query: Partial<QueryTaskDto>): Promise<ITask | undefined> {
        return this.fastify.pgsql(TB_COLUMNS_TASKS).select('*')
            .where(query).first();
    }

    async readAll(query: Partial<QueryTaskDto>): Promise<ITask[]> {
        return this.fastify.pgsql(TB_COLUMNS_TASKS).select('*')
            .where(query);
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