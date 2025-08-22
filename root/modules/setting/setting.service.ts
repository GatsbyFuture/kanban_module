import type {FastifyInstance} from "fastify";
import {SettingModel} from "./models/setting.model";

import {IBoardRole} from "./interfaces/setting.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateBoardRoleDto} from "./dto/board_role/create.board.role.dto";
import {QueryBoardRoleDto} from "./dto/board_role/query.board.role.dto";

export class SettingService {
    private settingModel: SettingModel;

    constructor(protected fastify: FastifyInstance) {
        this.settingModel = new SettingModel(fastify);
    }

    async create(createBoardRoleDto: CreateBoardRoleDto): Promise<IBoardRole> {
        try {
            const {name} = createBoardRoleDto;

            const board_role = await this.settingModel.readOne({name: name});

            if (board_role) {
                throw new HttpException(ErrorCodes.DATA_ALREADY_EXIST);
            }

            return this.settingModel.create(createBoardRoleDto);
        } catch (e) {
            throw e;
        }
    }

    async getOne(query: Partial<QueryBoardRoleDto>): Promise<IBoardRole> {
        try {
            const board_role = await this.settingModel.readOne(query);

            if (!board_role) {
                throw new HttpException(ErrorCodes.DATA_NOT_FOUND);
            }

            return board_role;
        } catch (e) {
            throw e;
        }
    }

    async getAll(query: Partial<QueryBoardRoleDto>): Promise<IBoardRole[]> {
        try {
            return this.settingModel.readAll(query);
        } catch (e) {
            throw e;
        }
    }
}