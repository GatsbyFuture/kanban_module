import type {FastifyInstance} from "fastify";
import {SettingController} from "./setting.controller";

import {
    optsCreateBoardRole,
    optsGetOneBoardRole, optsGetAllBoardRole,
    optsDelManyBoardRoles, optsCreateTaskRole, optsGetOneTaskRole, optsGetAllTaskRole, optsDelManyTaskRoles,
} from "./validations/setting.val";

export default async function SettingRoute(fastify: FastifyInstance) {
    const settingController = new SettingController(fastify);

    fastify.post(
        '/create-board-role',
        optsCreateBoardRole,
        settingController.createBR.bind(settingController)
    );

    fastify.get(
        '/get-one-board-role',
        optsGetOneBoardRole,
        settingController.getOneBR.bind(settingController)
    );

    fastify.get(
        '/get-all-board-roles',
        optsGetAllBoardRole,
        settingController.getAllBR.bind(settingController)
    );

    fastify.delete(
        '/del-many-board-roles',
        optsDelManyBoardRoles,
        settingController.deleteManyBR.bind(settingController)
    );

    // FOR TASK ROLE
    fastify.post(
        '/create-task-role',
        optsCreateTaskRole,
        settingController.createRT.bind(settingController)
    );

    fastify.get(
        '/get-one-task-role',
        optsGetOneTaskRole,
        settingController.getOneRT.bind(settingController)
    );

    fastify.get(
        '/get-all-task-roles',
        optsGetAllTaskRole,
        settingController.getAllRT.bind(settingController)
    );

    fastify.delete(
        '/del-many-task-roles',
        optsDelManyTaskRoles,
        settingController.deleteManyRT.bind(settingController)
    );
}