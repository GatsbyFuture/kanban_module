import type {FastifyInstance} from "fastify";
import {TaskModel} from "./models/task.model";

import {ITask} from "./interfaces/task.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateTaskDto} from "./dto/create.task.dto";
import {QueryTaskDto} from "./dto/query.task.dto";
import {UpdateTaskDto} from "./dto/update.task.dto";

export class TaskService {
    private taskModel: TaskModel;

    constructor(protected fastify: FastifyInstance) {
        this.taskModel = new TaskModel(fastify);
    }

    async create(createTaskDto: CreateTaskDto, made_by: string): Promise<ITask> {
        try {
            const task = await this.taskModel.readOne({title: createTaskDto.title});

            if (task) {
                throw new HttpException(ErrorCodes.TASK_ALREADY_EXIST);
            }

            const id: number = made_by ? +made_by : 0;

            const task_data = {...createTaskDto, made_by: id};

            return this.taskModel.create(task_data);
        } catch (e) {
            throw e;
        }
    }

    async getOne(queryTaskDto: Partial<QueryTaskDto>): Promise<ITask> {
        try {
            const task = await this.taskModel.readOne(queryTaskDto);

            if (!task) {
                throw new HttpException(ErrorCodes.TASK_NOT_FOUND);
            }

            return task;
        } catch (e) {
            throw e;
        }
    }

    async getAll(queryTaskDto: Partial<QueryTaskDto>): Promise<ITask[]> {
        try {
            return this.taskModel.readAll(queryTaskDto);
        } catch (e) {
            throw e;
        }
    }

    async updateMany(queryTaskDto: Partial<QueryTaskDto>, updateTaskDto: UpdateTaskDto): Promise<ITask[]> {
        try {
            return this.taskModel.update(queryTaskDto, updateTaskDto);
        } catch (e) {
            throw e;
        }
    }

    async deleteMany(ids: number[]): Promise<Partial<ITask>[]> {
        try {
            return this.taskModel.delete(ids);
        } catch (e) {
            throw e;
        }
    }
}