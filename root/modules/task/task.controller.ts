import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {TaskService} from "./task.service";

import {CreateTaskDto} from "./dto/create.task.dto";

export class TaskController {
    private taskService: TaskService;

    constructor(protected fastify: FastifyInstance) {
        this.taskService = new TaskService(fastify);
    }

    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createTaskDto = req.body as CreateTaskDto;

        return {
            success: true,
            data: await this.taskService.create(createTaskDto)
        }
    }
}