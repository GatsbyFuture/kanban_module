import type {FastifyInstance} from 'fastify';
import {config} from "../../../config/config";

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

    async create(createBoardDto: CreateBoardDto): Promise<object> {
        return {};
    }
}