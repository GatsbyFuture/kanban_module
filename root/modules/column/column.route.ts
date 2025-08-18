import type {FastifyInstance} from "fastify";
import {ColumnController} from "./column.controller";

export default async function ColumnRoute(fastify: FastifyInstance) {
    const columnController = new ColumnController(fastify);

    fastify.post('/create', columnController.create.bind(columnController));
}