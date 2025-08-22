import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {SettingService} from "./setting.service";

import {CreateBoardRoleDto} from "./dto/board_role/create.board.role.dto";

export class SettingController {
    settingService: SettingService;

    constructor(protected fastify: FastifyInstance) {
        this.settingService = new SettingService(fastify);
    }

    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createBoardRoleDto = req.body as CreateBoardRoleDto;

        return {
            success: true,
            data: await this.settingService.create(createBoardRoleDto)
        }
    }
}