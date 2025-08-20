import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {TaskService} from "./task.service";

import {CreateTaskDto} from "./dto/create.task.dto";
import {QueryTaskDto} from "./dto/query.task.dto";
import {UpdateTaskDto} from "./dto/update.task.dto";
import {DeleteTaskDto} from "./dto/delete.task.dto";
import {CreateTaskUserDto} from "./dto/create.task.user.dto";

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

    // CREATE TASK USERS
    async createUser(req: FastifyRequest, reply: FastifyReply) {
        const createTaskUserDto = req.body as { users: CreateTaskUserDto[] };

        return {
            success: true,
            data: await this.taskService.createUser(createTaskUserDto.users)
        }
    }
}