import type {FastifyInstance} from "fastify";

import {config} from "../../../config/config";

import {ITaskUser} from "../interfaces/task.user.interface";

import {CreateTaskUserDto} from "../dto/create.task.user.dto";
import {QueryTaskUserDto} from "../dto/query.task.user.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_TASKS_USERS
            }
        }
    }
} = config;

export class TaskUserModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createUserDto: CreateTaskUserDto): Promise<ITaskUser[]> {
        return this.fastify.pgsql(TB_TASKS_USERS).insert(createUserDto)
            .returning('*');
    }

    async readOne(query: QueryTaskUserDto): Promise<ITaskUser | undefined> {
        return this.fastify.pgsql(TB_TASKS_USERS).select('*')
            .where(query).first();
    }

    async readAll(query: QueryTaskUserDto): Promise<ITaskUser[]> {
        return this.fastify.pgsql(TB_TASKS_USERS).select('*')
            .where(query);
    }
}