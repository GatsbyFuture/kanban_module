import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {SettingService} from "./setting.service";

import {CreateBoardRoleDto} from "./dto/board_role/create.board.role.dto";
import {QueryBoardRoleDto} from "./dto/board_role/query.board.role.dto";
import {DelBoardRoleDto} from "./dto/board_role/delete.board.role.dto";

import {CreateTaskRoleDto} from "./dto/task_role/create.task.role.dto";
import {QueryTaskRoleDto} from "./dto/task_role/query.task.role.dto";
import {DelTaskRoleDto} from "./dto/task_role/delete.task.role.dto";

export class SettingController {
    private settingService: SettingService;

    constructor(protected fastify: FastifyInstance) {
        this.settingService = new SettingService(fastify);
    }

    async createBR(req: FastifyRequest, _reply: FastifyReply) {
        const createBoardRoleDto = req.body as CreateBoardRoleDto;

        return {
            success: true,
            data: await this.settingService.createBR(createBoardRoleDto)
        }
    }

    async getOneBR(req: FastifyRequest, _reply: FastifyReply) {
        const queryBoardRoleDto = req.query as Partial<QueryBoardRoleDto>;

        return {
            success: true,
            data: await this.settingService.getOneBR(queryBoardRoleDto)
        }
    }

    async getAllBR(req: FastifyRequest, _reply: FastifyReply) {
        const queryBoardRoleDto = req.query as Partial<QueryBoardRoleDto>;

        return {
            success: true,
            data: await this.settingService.getAllBR(queryBoardRoleDto)
        }
    }

    async deleteManyBR(req: FastifyRequest, _reply: FastifyReply) {
        const delBoardRoleDto = req.body as DelBoardRoleDto;

        return {
            success: true,
            data: await this.settingService.deleteManyBR(delBoardRoleDto.ids)
        }
    }

    // FOR TASK ROLE
    async createTR(req: FastifyRequest, _reply: FastifyReply) {
        const createTaskRoleDto = req.body as CreateTaskRoleDto;

        return {
            success: true,
            data: await this.settingService.createTR(createTaskRoleDto)
        }
    }

    async getOneTR(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskRoleDto = req.query as Partial<QueryTaskRoleDto>;

        return {
            success: true,
            data: await this.settingService.getOneTR(queryTaskRoleDto)
        }
    }

    async getAllTR(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskRoleDto = req.query as Partial<QueryTaskRoleDto>;

        return {
            success: true,
            data: await this.settingService.getAllTR(queryTaskRoleDto)
        }
    }

    async deleteManyTR(req: FastifyRequest, _reply: FastifyReply) {
        const delTaskRoleDto = req.body as DelTaskRoleDto;

        return {
            success: true,
            data: await this.settingService.deleteManyTR(delTaskRoleDto.ids)
        }
    }

    // FOR TASK PRIORITY
    async createTP(req: FastifyRequest, _reply: FastifyReply) {
        const createTaskRoleDto = req.body as CreateTaskRoleDto;

        return {
            success: true,
            data: await this.settingService.createTP(createTaskRoleDto)
        }
    }

    async getOneTP(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskRoleDto = req.query as Partial<QueryTaskRoleDto>;

        return {
            success: true,
            data: await this.settingService.getOneTP(queryTaskRoleDto)
        }
    }

    async getAllTP(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskRoleDto = req.query as Partial<QueryTaskRoleDto>;

        return {
            success: true,
            data: await this.settingService.getAllTP(queryTaskRoleDto)
        }
    }

    async deleteManyTP(req: FastifyRequest, _reply: FastifyReply) {
        const delTaskRoleDto = req.body as DelTaskRoleDto;

        return {
            success: true,
            data: await this.settingService.deleteManyTP(delTaskRoleDto.ids)
        }
    }
}