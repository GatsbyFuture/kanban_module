import type {FastifyInstance} from "fastify";
import {TaskController} from "./task.controller";

export default async function taskRoute(fastify: FastifyInstance) {
    const taskController = new TaskController(fastify);

    fastify.post('/create', taskController.create.bind(taskController));
}