import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {BoardService} from "./board.service";

import {CreateBoardDto} from "./dto/create.board.dto";
import {QueryBoardDto} from "./dto/query.board.dto";

export class BoardController {
    private boardService: BoardService;

    constructor(protected fastify: FastifyInstance) {
        this.boardService = new BoardService(fastify);
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const createBoardDto = req.body as CreateBoardDto;
        const made_by = String(req.headers['x-user-id'] || '');

        return {
            success: true,
            data: await this.boardService.create(createBoardDto, made_by)
        }
    }

    async getOne(req: FastifyRequest, reply: FastifyReply) {
        const queryBoardDto = req.query as QueryBoardDto;

        return {
            success: true,
            data: await this.boardService.getOne(queryBoardDto)
        }
    }

    async getAll(req: FastifyRequest, reply: FastifyReply) {
        const queryBoardDto = req.query as QueryBoardDto;

        return {
            success: true,
            data: await this.boardService.getAll(queryBoardDto)
        }
    }
}