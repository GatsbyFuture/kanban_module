import type {FastifyInstance} from "fastify";
import {BoardController} from "./board.controller";

import {optsCreateBoard} from "./validations/board.val";

export default async function BoardRoute(fastify: FastifyInstance) {
    const boardController = new BoardController(fastify);

    fastify.post('/create', optsCreateBoard, boardController.create.bind(boardController));
}