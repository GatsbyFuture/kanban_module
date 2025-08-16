import type {FastifyInstance} from "fastify";
import {ColumnService} from "./column.service";

export class ColumnController {
    private columnService: ColumnService;

    constructor(protected fastify: FastifyInstance) {
        this.columnService = new ColumnService(fastify);
    }
}