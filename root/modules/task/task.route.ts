import type {FastifyInstance} from "fastify";
import {TaskController} from "./task.controller";

import {
    optsCreateTask,
    optsQueryTaskAll, optsQueryTaskOne,
    optsUpdateTask, optsDeleteTask,
    // FOR TASK USERS
    optsCreateTaskUser,
    optsGetTaskUserOne, optsGetTaskUserAll, optsDeleteTaskUser, optsCreateTaskMsg, optsGetMsgOne,
} from "./validations/task.val";

export default async function taskRoute(fastify: FastifyInstance) {
    const taskController = new TaskController(fastify);

    fastify.post('/create', optsCreateTask, taskController.create.bind(taskController));

    fastify.get('/get-one', optsQueryTaskOne, taskController.getOne.bind(taskController));

    fastify.get('/get-all', optsQueryTaskAll, taskController.getAll.bind(taskController));

    fastify.patch('/update-many', optsUpdateTask, taskController.updateMany.bind(taskController));

    fastify.delete('/delete-many', optsDeleteTask, taskController.deleteMany.bind(taskController));

    // FOR TASK USERS
    fastify.post('/create-users', optsCreateTaskUser, taskController.createUser.bind(taskController));

    fastify.get('/get-one-user', optsGetTaskUserOne, taskController.getOneUser.bind(taskController));

    fastify.get('/get-all-users', optsGetTaskUserAll, taskController.getAllUsers.bind(taskController));

    fastify.delete('/delete-many-users', optsDeleteTaskUser, taskController.deleteUsers.bind(taskController));

    // FOR TASK MESSAGE
    fastify.post('/create-message', optsCreateTaskMsg, taskController.createMsg.bind(taskController));

    fastify.get('/get-one-msg', optsGetMsgOne, taskController.getOneMsg.bind(taskController));
}