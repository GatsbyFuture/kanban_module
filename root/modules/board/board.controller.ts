import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {BoardService} from "./board.service";
import {CreateBoardDto} from "./dto/create.board.dto";

export class BoardController {
    private boardService: BoardService;

    constructor(protected fastify: FastifyInstance) {
        this.boardService = new BoardService(fastify);
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const createBoardDto = req.body as CreateBoardDto;

        return {
            success: true,
            data: await this.boardService.create(createBoardDto)
        }
    }
}