import type {FastifyInstance} from "fastify";
import {ColumnModel} from "./models/column.model";

import {IColumn} from "./interfaces/column.interface";

import {CreateColumnDto} from "./dto/create.column.dto";
import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

export class ColumnService {
    private columnModel: ColumnModel;

    constructor(protected fastify: FastifyInstance) {
        this.columnModel = new ColumnModel(fastify);
    }

    async create(createColumnDto: CreateColumnDto): Promise<IColumn> {
        try {
            const {title} = createColumnDto;

            const column = await this.columnModel.readOne({title: title});

            if (column) {
                throw new HttpException(ErrorCodes.COLUMN_ALREADY_EXIST);
            }

            return this.columnModel.create(createColumnDto);
        } catch (e) {
            throw e;
        }
    }
}