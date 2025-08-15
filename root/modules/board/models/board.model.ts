import type {FastifyInstance} from 'fastify';
import {config} from "../../../config/config";

import {HttpException} from "../../../errors/custom.errors";

import {IBoard} from "../interfaces/board.interface";

import {CreateBoardDto} from "../dto/create.board.dto";
import {ErrorCodes} from "../../../enums/error.codes";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {TB_BOARDS, TB_BOARDS_SETTINGS, TB_BOARDS_USERS}
        }
    }
} = config;

export class BoardModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createBoardDto: CreateBoardDto): Promise<IBoard> {
        const transaction = await this.fastify.pgsql.transaction();
        try {
            const {settings, users, ...board_data} = createBoardDto;

            const new_board = await transaction(TB_BOARDS).insert(board_data)
                .returning('*')
                .then((rows) => rows[0]);

            const board_setting = await transaction(TB_BOARDS_SETTINGS).insert({
                board_id: new_board.id,
                ...settings
            }).returning('*').then((rows) => rows[0]);

            const modify_users = users.map(user => {
                return {
                    board_id: new_board.id,
                    ...user,
                }
            });

            const board_users = await transaction(TB_BOARDS_USERS).insert(modify_users)
                .returning('*');

            await transaction.commit();

            return {
                ...new_board,
                board_settings: board_setting,
                board_users: board_users
            };
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async readOne(query: object): Promise<IBoard | undefined> {
        return this.fastify.pgsql(TB_BOARDS).select('*').where(query).first();
    }
}