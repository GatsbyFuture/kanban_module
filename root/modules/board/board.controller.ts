import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {BoardService} from "./board.service";

import {CreateBoardDto} from "./dto/create.board.dto";
import {QueryBoardDto} from "./dto/query.board.dto";
import {UpdateBoardDto} from "./dto/update.board.dto";
import {QuerySettingDto} from "./dto/query.setting.dto";
import {UpdateSettingDto} from "./dto/update.setting.dto";
import {CreateUserDto} from "./dto/create.user.dto";

export class BoardController {
    private boardService: BoardService;

    constructor(protected fastify: FastifyInstance) {
        this.boardService = new BoardService(fastify);
    }

    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createBoardDto = req.body as CreateBoardDto;
        const made_by = String(req.headers['x-user-id'] || '');

        return {
            success: true,
            data: await this.boardService.create(createBoardDto, made_by)
        }
    }

    async getOne(req: FastifyRequest, _reply: FastifyReply) {
        const queryBoardDto = req.query as QueryBoardDto;

        return {
            success: true,
            data: await this.boardService.getOne(queryBoardDto)
        }
    }

    async getAll(req: FastifyRequest, _reply: FastifyReply) {
        const queryBoardDto = req.query as QueryBoardDto;

        return {
            success: true,
            data: await this.boardService.getAll(queryBoardDto)
        }
    }

    async updateBoard(req: FastifyRequest, _reply: FastifyReply) {
        const queryBoardDto = req.query as Partial<QueryBoardDto>;
        const updateBoardDto = req.body as Partial<UpdateBoardDto>;

        return {
            success: true,
            data: await this.boardService.updateBoard(queryBoardDto, updateBoardDto)
        }
    }

    async updateSetting(req: FastifyRequest, _reply: FastifyReply) {
        const querySettingDto = req.query as QuerySettingDto;
        const updateSettingDto = req.body as Partial<UpdateSettingDto>;

        return {
            success: true,
            data: await this.boardService.updateSetting(querySettingDto, updateSettingDto)
        }
    }

    async createUsers(req: FastifyRequest, _reply: FastifyReply) {
        const createUsersDto = req.body as { users: CreateUserDto[] };

        return {
            success: true,
            data: await this.boardService.createUsers(createUsersDto.users)
        }
    }
}