import type {FastifyInstance} from "fastify";

import {config} from "../../../config/config";

import {ITaskMsg} from "../interfaces/task.msg.interface";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_TASKS_USERS
            }
        }
    }
} = config;

export class TaskMsgModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(): Promise<ITaskMsg> {

    }
}