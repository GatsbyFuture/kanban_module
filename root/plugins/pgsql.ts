import type {FastifyInstance} from "fastify";
import fp from 'fastify-plugin';
import pgsql from "../db/pgsql/connection";

export default fp(async (fastify: FastifyInstance) => {
    try {
        await pgsql.raw('SELECT 1');
        fastify.log.info('✅ PostgreSQL connection successfully');
        console.log('✅ PostgreSQL connection successfully');
    } catch (e) {
        fastify.log.error(`❌ PostgreSQL connection error: ${e}`);
        console.log('❌ PostgreSQL connection error:', e);
        process.exit(1);
    }

    fastify.decorate('pgsql', pgsql);
});