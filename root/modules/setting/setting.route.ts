import type {FastifyInstance} from "fastify";
import {SettingController} from "./setting.controller";

import {
    optsCreateBoardRole,
    optsGetOneBoardRole, optsGetAllBoardRole,
    optsDelManyBoardRoles,
} from "./validations/setting.val";

export default async function SettingRoute(fastify: FastifyInstance) {
    const settingController = new SettingController(fastify);

    fastify.post(
        '/create-board-role',
        optsCreateBoardRole,
        settingController.create.bind(settingController)
    );

    fastify.get(
        '/get-one-board-role',
        optsGetOneBoardRole,
        settingController.getOne.bind(settingController)
    );

    fastify.get(
        '/get-all-board-roles',
        optsGetAllBoardRole,
        settingController.getAll.bind(settingController)
    );

    fastify.delete(
        '/del-many-board-roles',
        optsDelManyBoardRoles,
        settingController.deleteMany.bind(settingController)
    );
}