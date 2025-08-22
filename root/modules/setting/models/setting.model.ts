import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IBoardRole} from "../interfaces/setting.interface";

import {CreateBoardRoleDto} from "../dto/board_role/create.board.role.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_BOARDS_ROLES
            }
        }
    }
} = config;

export class SettingModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createBoardRoleDto: CreateBoardRoleDto): Promise<IBoardRole> {
        return this.fastify.pgsql(TB_BOARDS_ROLES).insert(createBoardRoleDto)
            .returning('*').then(rows => rows[0]);
    }

    // async getOne()
}