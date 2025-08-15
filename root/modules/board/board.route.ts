import type {FastifyInstance} from "fastify";
import {BoardController} from "./board.controller";

export default async function BoardRoute(fastify: FastifyInstance) {
    const boardController = new BoardController(fastify);

    fastify.post('/create', boardController.create.bind(boardController));
}