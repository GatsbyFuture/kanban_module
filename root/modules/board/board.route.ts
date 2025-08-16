import type {FastifyInstance} from "fastify";
import {BoardController} from "./board.controller";

import {
    optsCreateBoard,
    optsQueryBoard,
    optsQueryBoardAll,
    optsUpdateBoard,
    optsUpdateSetting
} from "./validations/board.val";

export default async function BoardRoute(fastify: FastifyInstance) {
    const boardController = new BoardController(fastify);

    fastify.post('/create', optsCreateBoard, boardController.create.bind(boardController));

    fastify.get('/get-one', optsQueryBoard, boardController.getOne.bind(boardController));

    fastify.get('/get-all', optsQueryBoardAll, boardController.getAll.bind(boardController));

    fastify.patch('/update', optsUpdateBoard, boardController.updateBoard.bind(boardController));

    fastify.patch('/update-setting', optsUpdateSetting, boardController.updateSetting.bind(boardController));
}