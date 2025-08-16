import type {FastifyInstance} from "fastify";

export class ColumnModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createColumnDto: object): Promise<object> {
        return {}
    }
}