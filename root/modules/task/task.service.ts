import type {FastifyInstance} from "fastify";
import {TaskModel} from "./models/task.model";

import {ITask} from "./interfaces/task.interface";

import {CreateTaskDto} from "./dto/create.task.dto";

export class TaskService {
    private taskModel: TaskModel;

    constructor(protected fastify: FastifyInstance) {
        this.taskModel = new TaskModel(fastify);
    }

    async create(createTaskDto: CreateTaskDto): Promise<ITask> {
        try {
            return {} as ITask;
        } catch (e) {
            throw e;
        }
    }
}