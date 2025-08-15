import 'fastify';
import {Knex} from "knex";

declare module 'fastify' {
    interface FastifyInstance {
        pgsql: Knex;
    }
}