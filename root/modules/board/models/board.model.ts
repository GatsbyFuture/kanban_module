import type {FastifyInstance} from 'fastify';
import {config} from "../../../config/config";

import {IBoard} from "../interfaces/board.interface";

import {CreateBoardDto} from "../dto/create.board.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {TB_BOARDS}
        }
    }
} = config;

export class BoardModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createBoardDto: CreateBoardDto): Promise<IBoard | undefined> {
        const transaction = await this.fastify.pgsql.transaction();
        try {
            const board = await transaction(TB_BOARDS).insert(createBoardDto)
                .returning('*')
                .then((rows) => rows[0]);

            await transaction.commit();

            return board;
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }
}