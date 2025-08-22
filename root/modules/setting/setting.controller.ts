import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {SettingService} from "./setting.service";

import {CreateBoardRoleDto} from "./dto/board_role/create.board.role.dto";
import {QueryBoardRoleDto} from "./dto/board_role/query.board.role.dto";
import {DelBoardRoleDto} from "./dto/board_role/delete.board.role.dto";

export class SettingController {
    private settingService: SettingService;

    constructor(protected fastify: FastifyInstance) {
        this.settingService = new SettingService(fastify);
    }

    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createBoardRoleDto = req.body as CreateBoardRoleDto;

        return {
            success: true,
            data: await this.settingService.createBR(createBoardRoleDto)
        }
    }

    async getOne(req: FastifyRequest, _reply: FastifyReply) {
        const queryBoardRoleDto = req.query as Partial<QueryBoardRoleDto>;

        return {
            success: true,
            data: await this.settingService.getOneBR(queryBoardRoleDto)
        }
    }

    async getAll(req: FastifyRequest, _reply: FastifyReply) {
        const queryBoardRoleDto = req.query as Partial<QueryBoardRoleDto>;

        return {
            success: true,
            data: await this.settingService.getAllBR(queryBoardRoleDto)
        }
    }

    async deleteMany(req: FastifyRequest, _reply: FastifyReply) {
        const delBoardRoleDto = req.body as DelBoardRoleDto;

        return {
            success: true,
            data: await this.settingService.deleteManyBR(delBoardRoleDto.ids)
        }
    }
}