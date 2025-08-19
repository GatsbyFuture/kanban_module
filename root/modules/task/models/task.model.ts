import type {FastifyInstance} from "fastify";
import {ITask} from "../interfaces/task.interface";

import {config} from "../../../config/config";

import {CreateTaskDto} from "../dto/create.task.dto";
import {QueryTaskDto} from "../dto/query.task.dto";

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

    async readOne(query: Partial<QueryTaskDto>): Promise<ITask> {
        return this.fastify.pgsql(TB_COLUMNS_TASKS).select('*')
            .where(query).first();
    }
}