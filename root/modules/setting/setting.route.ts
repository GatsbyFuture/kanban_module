import type {FastifyInstance} from "fastify";
import {SettingController} from "./setting.controller";

import {
    optsCreateBoardRole,
    optsGetOneBoardRole
} from "./validations/setting.val";

export default async function SettingRoute(fastify: FastifyInstance) {
    const settingController = new SettingController(fastify);

    fastify.post('/create-board-role', optsCreateBoardRole, settingController.create.bind(settingController));

    fastify.get('/get-one-board-role', optsGetOneBoardRole, settingController.getOne.bind(settingController));
}