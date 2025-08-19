import type {FastifyInstance} from "fastify";
import {TaskController} from "./task.controller";

import {optsCreateTask} from "./validations/task.val";

export default async function taskRoute(fastify: FastifyInstance) {
    const taskController = new TaskController(fastify);

    fastify.post('/create', optsCreateTask, taskController.create.bind(taskController));
}