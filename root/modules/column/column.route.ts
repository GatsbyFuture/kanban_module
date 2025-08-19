import type {FastifyInstance} from "fastify";
import {ColumnController} from "./column.controller";

import {
    optsCreateColumn,
    optsQueryColumnOne,
    optsQueryColumnAll,
} from "./validations/column.val";

export default async function ColumnRoute(fastify: FastifyInstance) {
    const columnController = new ColumnController(fastify);

    fastify.post('/create', optsCreateColumn, columnController.create.bind(columnController));

    fastify.get('/get-one', optsQueryColumnOne, columnController.getOne.bind(columnController));

    fastify.get('/get-all', optsQueryColumnAll, columnController.getAll.bind(columnController));
}