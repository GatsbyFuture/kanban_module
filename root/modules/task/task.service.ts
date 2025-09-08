import type {FastifyInstance} from "fastify";
import {TaskModel} from "./models/task.model";
import {TaskUserModel} from "./models/task.user.model";

import {ITask} from "./interfaces/task.interface";
import {ITaskUser} from "./interfaces/task.user.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateTaskDto} from "./dto/create.task.dto";
import {QueryTaskDto} from "./dto/query.task.dto";
import {UpdateTaskDto} from "./dto/update.task.dto";
import {CreateTaskUserDto} from "./dto/user/create.task.user.dto";
import {QueryTaskUserDto} from "./dto/user/query.task.user.dto";
import {ITaskMsg} from "./interfaces/task.msg.interface";
import {TaskMsgModel} from "./models/task.msg.model";
import {CreateTaskMsgDto} from "./dto/msg/create.task.msg.dto";
import {QueryTaskMsgDto} from "./dto/msg/query.task.msg.dto";
import {UpdateTaskMsgDto} from "./dto/msg/update.task.msg.dto";

export class TaskService {
    private taskModel: TaskModel;
    private taskUserModel: TaskUserModel;
    private taskMsgModel: TaskMsgModel;

    constructor(protected fastify: FastifyInstance) {
        this.taskModel = new TaskModel(fastify);
        this.taskUserModel = new TaskUserModel(fastify);
        this.taskMsgModel = new TaskMsgModel(fastify);
    }

    async create(createTaskDto: Partial<CreateTaskDto>, made_by: string): Promise<ITask> {
        try {
            // const task = await this.taskModel.readOne({title: createTaskDto.title});
            //
            // if (task) {
            //     throw new HttpException(ErrorCodes.TASK_ALREADY_EXIST);
            // }

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
            return this.taskModel.deleteMany(ids);
        } catch (e) {
            throw e;
        }
    }

    // FOR TASK USERS
    async createUser(createTaskUserDto: CreateTaskUserDto[]): Promise<ITaskUser[]> {
        try {
            return this.taskUserModel.create(createTaskUserDto);
        } catch (e) {
            throw e;
        }
    }

    async getOneUser(queryTaskUserDto: QueryTaskUserDto): Promise<ITaskUser> {
        try {
            const task_user = await this.taskUserModel.readOne(queryTaskUserDto);

            if (!task_user) {
                throw new HttpException(ErrorCodes.TASK_USER_NOT_FOUND);
            }

            return task_user;
        } catch (e) {
            throw e;
        }
    }

    async getAllUsers(queryTaskUserDto: QueryTaskUserDto): Promise<ITaskUser[]> {
        try {
            return this.taskUserModel.readAll(queryTaskUserDto);
        } catch (e) {
            throw e;
        }
    }

    async deleteUsers(ids: number[]): Promise<Partial<ITaskUser>[]> {
        try {
            return this.taskUserModel.deleteMany(ids);
        } catch (e) {
            throw e;
        }
    }

    // FOR TASK MESSAGES
    async createMsg(createTaskMsgDto: CreateTaskMsgDto): Promise<ITaskMsg> {
        try {
            return this.taskMsgModel.create(createTaskMsgDto);
        } catch (e) {
            throw e;
        }
    }

    async getOneMsg(queryTaskMsgDto: Partial<QueryTaskMsgDto>): Promise<ITaskMsg> {
        try {
            const task_msg = await this.taskMsgModel.readOne(queryTaskMsgDto);

            if (!task_msg) {
                throw new HttpException(ErrorCodes.TASK_MSG_NOT_FOUND);
            }

            return task_msg;
        } catch (e) {
            throw e;
        }
    }

    async getAllMsgs(queryTaskMsgDto: Partial<QueryTaskMsgDto>): Promise<ITaskMsg[]> {
        try {
            return this.taskMsgModel.readAll(queryTaskMsgDto);
        } catch (e) {
            throw e;
        }
    }

    async updateManyMsg(query: Partial<QueryTaskMsgDto>, update: Partial<UpdateTaskMsgDto>): Promise<ITaskMsg[]> {
        try {
            return this.taskMsgModel.updateMany(query, update);
        } catch (e) {
            throw e;
        }
    }

    async deleteManyMsg(ids: number[]): Promise<Partial<ITaskMsg>[]> {
        try {
            return this.taskMsgModel.deleteMany(ids);
        } catch (e) {
            throw e;
        }
    }
}