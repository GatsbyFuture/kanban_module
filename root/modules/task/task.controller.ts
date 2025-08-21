import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {TaskService} from "./task.service";

import {CreateTaskDto} from "./dto/create.task.dto";
import {QueryTaskDto} from "./dto/query.task.dto";
import {UpdateTaskDto} from "./dto/update.task.dto";
import {DeleteTaskDto} from "./dto/delete.task.dto";
import {CreateTaskUserDto} from "./dto/user/create.task.user.dto";
import {QueryTaskUserDto} from "./dto/user/query.task.user.dto";
import {DelTaskUserDto} from "./dto/user/delete.task.user.dto";
import {CreateTaskMsgDto} from "./dto/msg/create.task.msg.dto";
import {ITaskMsg} from "./interfaces/task.msg.interface";

export class TaskController {
    private taskService: TaskService;

    constructor(protected fastify: FastifyInstance) {
        this.taskService = new TaskService(fastify);
    }

    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createTaskDto = req.body as CreateTaskDto;
        const made_by = String(req.headers['x-user-id'] || '');

        return {
            success: true,
            data: await this.taskService.create(createTaskDto, made_by)
        }
    }

    async getOne(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskDto = req.query as QueryTaskDto;

        return {
            success: true,
            data: await this.taskService.getOne(queryTaskDto)
        }
    }

    async getAll(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskDto = req.query as QueryTaskDto;

        return {
            success: true,
            data: await this.taskService.getAll(queryTaskDto)
        }
    }

    async updateMany(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskDto = req.query as Partial<QueryTaskDto>;
        const updateTaskDto = req.body as UpdateTaskDto;

        return {
            success: true,
            data: await this.taskService.updateMany(queryTaskDto, updateTaskDto)
        }
    }

    async deleteMany(req: FastifyRequest, _reply: FastifyReply) {
        const deleteTaskDto = req.body as DeleteTaskDto;

        return {
            success: true,
            data: await this.taskService.deleteMany(deleteTaskDto.ids)
        }
    }

    // FOR TASK USERS
    async createUser(req: FastifyRequest, _reply: FastifyReply) {
        const createTaskUserDto = req.body as { users: CreateTaskUserDto[] };

        return {
            success: true,
            data: await this.taskService.createUser(createTaskUserDto.users)
        }
    }

    async getOneUser(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskUserDto = req.query as QueryTaskUserDto;

        return {
            success: true,
            data: await this.taskService.getOneUser(queryTaskUserDto)
        }
    }

    async getAllUsers(req: FastifyRequest, _reply: FastifyReply) {
        const queryTaskUserDto = req.query as QueryTaskUserDto;

        return {
            success: true,
            data: await this.taskService.getAllUsers(queryTaskUserDto)
        }
    }

    async deleteUsers(req: FastifyRequest, _reply: FastifyReply) {
        const delTaskUserDto = req.body as DelTaskUserDto;

        return {
            success: true,
            data: await this.taskService.deleteUsers(delTaskUserDto.ids)
        }
    }

    // FOR TASK MESSAGES
    async createMsg(req: FastifyRequest, _reply: FastifyReply) {
        const createTaskMsgDto = req.body as CreateTaskMsgDto;

        return {
            success: true,
            data: await this.taskService.createMsg(createTaskMsgDto)
        }
    }
}