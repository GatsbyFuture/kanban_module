import Fastify, {FastifyInstance} from 'fastify';
import cron from 'node-cron';
import cors from '@fastify/cors';
import path from 'path';
import * as fs from "node:fs";

import errorPlugin from "./plugins/error";
import pgsqlPlugin from './plugins/pgsql';
// import redisPlugin from './plugins/redis';
// import axiosPlugin from './plugins/axios';
// import cronPlugin from './plugins/cron';

import boardRoute from "./modules/board/board.route";
import columnRoute from "./modules/column/column.route";
import taskRoute from "./modules/task/task.route";
import settingRoute from "./modules/setting/setting.route";

const log_path = path.join(__dirname, 'logs');
if (!fs.existsSync(log_path)) {
    fs.mkdirSync(log_path, {recursive: true});
}

const fastify: FastifyInstance = Fastify({
    logger: {
        level: 'error',
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                destination: path.join(log_path, 'app.log'),
                colorize: false,
            },
        },
    },
    ajv: {
        customOptions: {
            coerceTypes: 'array',
            removeAdditional: true,
            allErrors: false,
        }
    }
});

fastify.register(cors, {
    origin: (origin, cb) => {
        cb(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
});

fastify.register(errorPlugin);
fastify.register(pgsqlPlugin);
// fastify.register(redisPlugin);
// fastify.register(axiosPlugin);
// fastify.register(cronPlugin);

fastify.register(boardRoute, {prefix: '/board'});
fastify.register(columnRoute, {prefix: '/column'});
fastify.register(taskRoute, {prefix: '/task'});
fastify.register(settingRoute, {prefix: '/setting'});

const start = async () => {
    try {
        const port: number = parseInt(process.env.PORT || "5651", 10);
        await fastify.listen({port: port, host: '0.0.0.0'});
        console.log('Server listening on port :', port);
    } catch (e) {
        fastify.log.error(e);
        process.exit(1);
    }
}

(async () => {
    await start();
})();

// This cron cleans an app.log every Sunday at 23:59...
cron.schedule('0 59 23 * * 0', () => {
    try {
        fs.truncateSync(path.join(__dirname, 'logs', 'app.log'), 0);

        fastify.log.info('[CRON] app.log cleared successfully.');
    } catch (err) {
        fastify.log.error(`[CRON] Error clearing app.log: ${err}`);
    }
}, {
    timezone: 'Asia/Tashkent',
});