import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {TaskService} from "./task.service";

import {CreateTaskDto} from "./dto/create.task.dto";
import {QueryTaskDto} from "./dto/query.task.dto";

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
}