import type {FastifyInstance} from "fastify";
import {SettingModel} from "./models/setting.model";

import {IBoardRole, ITaskPrio, ITaskRole} from "./interfaces/setting.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateBoardRoleDto} from "./dto/board_role/create.board.role.dto";
import {QueryBoardRoleDto} from "./dto/board_role/query.board.role.dto";
import {CreateTaskRoleDto} from "./dto/task_role/create.task.role.dto";
import {QueryTaskRoleDto} from "./dto/task_role/query.task.role.dto";
import {CreateTaskPrioDto} from "./dto/task_prio/create.task.prio.dto";
import {QueryTaskPrioDto} from "./dto/task_prio/query.task.prio.dto";

export class SettingService {
    private settingModel: SettingModel;

    constructor(protected fastify: FastifyInstance) {
        this.settingModel = new SettingModel(fastify);
    }

    async createBR(createBoardRoleDto: CreateBoardRoleDto): Promise<IBoardRole> {
        try {
            const {name} = createBoardRoleDto;

            const board_role = await this.settingModel.readOneBR({name: name});

            if (board_role) {
                throw new HttpException(ErrorCodes.DATA_ALREADY_EXIST);
            }

            return this.settingModel.createBR(createBoardRoleDto);
        } catch (e) {
            throw e;
        }
    }

    async getOneBR(query: Partial<QueryBoardRoleDto>): Promise<IBoardRole> {
        try {
            const board_role = await this.settingModel.readOneBR(query);

            if (!board_role) {
                throw new HttpException(ErrorCodes.DATA_NOT_FOUND);
            }

            return board_role;
        } catch (e) {
            throw e;
        }
    }

    async getAllBR(query: Partial<QueryBoardRoleDto>): Promise<IBoardRole[]> {
        try {
            return this.settingModel.readAllBR(query);
        } catch (e) {
            throw e;
        }
    }

    async deleteManyBR(ids: number[]): Promise<Partial<IBoardRole>[]> {
        try {
            return this.settingModel.deleteManyBR(ids);
        } catch (e) {
            throw e;
        }
    }

    // FOR TASK ROLE
    async createTR(createTaskRoleDto: CreateTaskRoleDto): Promise<ITaskRole> {
        try {
            const {name} = createTaskRoleDto;

            const task_role = await this.settingModel.readOneTR({name: name});

            if (task_role) {
                throw new HttpException(ErrorCodes.DATA_ALREADY_EXIST);
            }

            return this.settingModel.createTR(createTaskRoleDto);
        } catch (e) {
            throw e;
        }
    }

    async getOneTR(query: Partial<QueryTaskRoleDto>): Promise<ITaskRole> {
        try {
            const board_role = await this.settingModel.readOneTR(query);

            if (!board_role) {
                throw new HttpException(ErrorCodes.DATA_NOT_FOUND);
            }

            return board_role;
        } catch (e) {
            throw e;
        }
    }

    async getAllTR(query: Partial<QueryTaskRoleDto>): Promise<ITaskRole[]> {
        try {
            return this.settingModel.readAllTR(query);
        } catch (e) {
            throw e;
        }
    }

    async deleteManyTR(ids: number[]): Promise<Partial<ITaskRole>[]> {
        try {
            return this.settingModel.deleteManyTR(ids);
        } catch (e) {
            throw e;
        }
    }

    // FOR TASK PRIORITY
    async createTP(createTaskPrioDto: CreateTaskPrioDto): Promise<ITaskPrio> {
        try {
            const {name} = createTaskPrioDto;

            const task_role = await this.settingModel.readOneTP({name: name});

            if (task_role) {
                throw new HttpException(ErrorCodes.DATA_ALREADY_EXIST);
            }

            return this.settingModel.createTP(createTaskPrioDto);
        } catch (e) {
            throw e;
        }
    }

    async getOneTP(query: Partial<QueryTaskPrioDto>): Promise<ITaskPrio> {
        try {
            const board_role = await this.settingModel.readOneTP(query);

            if (!board_role) {
                throw new HttpException(ErrorCodes.DATA_NOT_FOUND);
            }

            return board_role;
        } catch (e) {
            throw e;
        }
    }

    async getAllTP(query: Partial<QueryTaskPrioDto>): Promise<ITaskPrio[]> {
        try {
            return this.settingModel.readAllTP(query);
        } catch (e) {
            throw e;
        }
    }

    async deleteManyTP(ids: number[]): Promise<Partial<ITaskPrio>[]> {
        try {
            return this.settingModel.deleteManyTP(ids);
        } catch (e) {
            throw e;
        }
    }
}