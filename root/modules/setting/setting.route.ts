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
        settingController.createTR.bind(settingController)
    );

    fastify.get(
        '/get-one-task-role',
        optsGetOneTaskRole,
        settingController.getOneTR.bind(settingController)
    );

    fastify.get(
        '/get-all-task-roles',
        optsGetAllTaskRole,
        settingController.getAllTR.bind(settingController)
    );

    fastify.delete(
        '/del-many-task-roles',
        optsDelManyTaskRoles,
        settingController.deleteManyTR.bind(settingController)
    );

    // FOR TASK PRIORITY
    fastify.post(
        '/create-task-prio',
        optsCreateTaskRole,
        settingController.createTP.bind(settingController)
    );

    fastify.get(
        '/get-one-task-prio',
        optsGetOneTaskRole,
        settingController.getOneTP.bind(settingController)
    );

    fastify.get(
        '/get-all-task-prio',
        optsGetAllTaskRole,
        settingController.getAllTP.bind(settingController)
    );

    fastify.delete(
        '/del-many-task-prio',
        optsDelManyTaskRoles,
        settingController.deleteManyTP.bind(settingController)
    );
}