import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {ColumnService} from "./column.service";

import {CreateColumnDto} from "./dto/create.column.dto";
import {QueryColumnDto} from "./dto/query.column.dto";
import {UpdateColumnDto} from "./dto/update.column.dto";
import {DeleteColumnDto} from "./dto/delete.column.dto";

export class ColumnController {
    private columnService: ColumnService;

    constructor(protected fastify: FastifyInstance) {
        this.columnService = new ColumnService(fastify);
    }

    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createColumnDto = req.body as CreateColumnDto;

        return {
            success: true,
            data: await this.columnService.create(createColumnDto)
        }
    }

    async getOne(req: FastifyRequest, _reply: FastifyReply) {
        const queryColumnDto = req.query as QueryColumnDto;

        return {
            success: true,
            data: await this.columnService.getOne(queryColumnDto)
        }
    }

    async getAll(req: FastifyRequest, _reply: FastifyReply) {
        const queryColumnDto = req.query as QueryColumnDto;

        return {
            success: true,
            data: await this.columnService.getAll(queryColumnDto)
        }
    }

    async updateMany(req: FastifyRequest, _reply: FastifyReply) {
        const queryColumnDto = req.query as QueryColumnDto;
        const updateColumnDto = req.body as UpdateColumnDto;

        return {
            success: true,
            data: await this.columnService.updateMany(queryColumnDto, updateColumnDto)
        }
    }

    async deleteMany(req: FastifyRequest, _reply: FastifyReply) {
        const deleteColumnDto = req.body as DeleteColumnDto;

        return {
            success: true,
            data: await this.columnService.deleteMany(deleteColumnDto.ids)
        }
    }
}