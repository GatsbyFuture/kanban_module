import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {ColumnService} from "./column.service";
import {CreateColumnDto} from "./dto/create.column.dto";

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
}