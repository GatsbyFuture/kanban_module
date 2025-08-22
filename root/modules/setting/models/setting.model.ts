import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IBoardRole} from "../interfaces/setting.interface";

import {CreateBoardRoleDto} from "../dto/board_role/create.board.role.dto";
import {QueryBoardRoleDto} from "../dto/board_role/query.board.role.dto";

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

    async getOne(query: QueryBoardRoleDto): Promise<IBoardRole> {
        return this.fastify.pgsql(TB_BOARDS_ROLES).select('*')
            .where(query).first();
    }

    async getAll(query: QueryBoardRoleDto): Promise<IBoardRole[]> {
        return this.fastify.pgsql(TB_BOARDS_ROLES).select('*')
            .where(query);
    }

    async deleteMany(ids: number[]): Promise<Partial<IBoardRole>[]> {
        return this.fastify.pgsql(TB_BOARDS_ROLES).whereIn('id', ids)
            .returning(['code', 'name']).del();
    }
}