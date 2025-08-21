import type {FastifyInstance} from "fastify";

import {config} from "../../../config/config";

import {ITaskMsg} from "../interfaces/task.msg.interface";

import {CreateTaskMsgDto} from "../dto/msg/create.task.msg.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_TASKS_MESSAGES
            }
        }
    }
} = config;

export class TaskMsgModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createTaskMsgDto: CreateTaskMsgDto): Promise<ITaskMsg> {
        return this.fastify.pgsql(TB_TASKS_MESSAGES).insert(createTaskMsgDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOne(query: object): Promise<ITaskMsg | undefined> {
        return this.fastify.pgsql(TB_TASKS_MESSAGES).select('*')
            .where(query).first();
    }

    async readAll(query: object): Promise<ITaskMsg[]> {
        return this.fastify.pgsql(TB_TASKS_MESSAGES).select('*')
            .where(query);
    }
}