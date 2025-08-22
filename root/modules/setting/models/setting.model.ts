import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IBoardRole, ITaskRole} from "../interfaces/setting.interface";

import {CreateBoardRoleDto} from "../dto/board_role/create.board.role.dto";
import {QueryBoardRoleDto} from "../dto/board_role/query.board.role.dto";
import {CreateTaskRoleDto} from "../dto/task_prio/create.task.role.dto";
import {QueryTaskRoleDto} from "../dto/task_prio/query.task.role.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS_ROLES,
                TB_TASKS_ROLES,
                TB_TASKS_PRIORITIES
            }
        }
    }
} = config;

export class SettingModel {
    constructor(protected fastify: FastifyInstance) {
    }

    // FOR BOARD ROLE
    async createBR(createBoardRoleDto: CreateBoardRoleDto): Promise<IBoardRole> {
        return this.fastify.pgsql(TB_BOARDS_ROLES).insert(createBoardRoleDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOneBR(query: Partial<QueryBoardRoleDto>): Promise<IBoardRole | undefined> {
        return this.fastify.pgsql(TB_BOARDS_ROLES).select('*')
            .where(query).first();
    }

    async readAllBR(query: Partial<QueryBoardRoleDto>): Promise<IBoardRole[]> {
        return this.fastify.pgsql(TB_BOARDS_ROLES).select('*')
            .where(query);
    }

    async deleteManyBR(ids: number[]): Promise<Partial<IBoardRole>[]> {
        return this.fastify.pgsql(TB_BOARDS_ROLES).whereIn('id', ids)
            .returning(['code', 'name']).del();
    }

    // FOR TASK ROLE
    async createTR(createTaskRoleDto: CreateTaskRoleDto): Promise<ITaskRole> {
        return this.fastify.pgsql(TB_TASKS_ROLES).insert(createTaskRoleDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOneTR(query: Partial<QueryTaskRoleDto>): Promise<ITaskRole | undefined> {
        return this.fastify.pgsql(TB_TASKS_ROLES).select('*')
            .where(query).first();
    }

    async readAllTR(query: Partial<QueryTaskRoleDto>): Promise<ITaskRole[]> {
        return this.fastify.pgsql(TB_TASKS_ROLES).select('*')
            .where(query);
    }

    async deleteManyTR(ids: number[]): Promise<Partial<ITaskRole>[]> {
        return this.fastify.pgsql(TB_TASKS_ROLES).whereIn('id', ids)
            .returning(['code', 'name']).del();
    }
}