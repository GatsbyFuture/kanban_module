import type {FastifyInstance} from "fastify";
import {SettingController} from "./setting.controller";

export default async function SettingRoute(fastify: FastifyInstance) {
    const settingController = new SettingController(fastify);

    fastify.post('/create-board-role', settingController.create.bind(settingController))
}