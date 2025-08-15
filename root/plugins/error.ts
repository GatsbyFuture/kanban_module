import type {FastifyInstance} from "fastify";
import fp from "fastify-plugin";
import {HttpException} from "../errors/custom.errors";

export default fp(async (fastify: FastifyInstance) => {
    fastify.setErrorHandler((err, _req, reply) => {
        if (err instanceof HttpException) {
            return reply.status(err.statusCode).send({error: err.message, code: err.name});
        }

        if ((err as any).validation) {
            return reply.status(400).send({error: 'Validation error', details: (err as any).validation});
        }

        // Log unknown errors
        fastify.log.error(err);
        return reply.status(500).send({error: 'Internal server error'});
    });
});