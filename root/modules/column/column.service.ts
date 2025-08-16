import type {FastifyInstance} from "fastify";
import {ColumnModel} from "./models/column.model";

export class ColumnService {
    private columnModel: ColumnModel;

    constructor(protected fastify: FastifyInstance) {
        this.columnModel = new ColumnModel(fastify);
    }

    async create(createColumnDto: object): Promise<object> {
        try {
            return this.columnModel.create(createColumnDto);
        } catch (e) {
            throw e;
        }
    }
}