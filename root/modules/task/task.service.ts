import type {FastifyInstance} from "fastify";
import {TaskModel} from "./models/task.model";

import {ITask} from "./interfaces/task.interface";

import {CreateTaskDto} from "./dto/create.task.dto";
import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

export class TaskService {
    private taskModel: TaskModel;

    constructor(protected fastify: FastifyInstance) {
        this.taskModel = new TaskModel(fastify);
    }

    async create(createTaskDto: CreateTaskDto): Promise<ITask> {
        try {
            const {title} = createTaskDto;

            const task = await this.taskModel.readOne({title: title});

            if (task) {
                throw new HttpException(ErrorCodes.TASK_ALREADY_EXIST);
            }

            return this.taskModel.create(createTaskDto);
        } catch (e) {
            throw e;
        }
    }
}