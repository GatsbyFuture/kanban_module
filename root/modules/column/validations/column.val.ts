import {RouteShorthandOptions} from "fastify";

const createColumn = {
    type: 'object',
    required: ['board_id', 'title', 'position'],
    properties: {
        board_id: {
            type: 'integer',
            minimum: 1
        },
        title: {
            type: 'string',
            minlength: 2
        },
        position: {
            type: 'number',
        },
        wip_limit: {
            type: 'number',
        },
        is_backlog: {
            type: 'boolean',
        },
        is_done: {
            type: 'boolean',
        },
        meta: {
            type: 'object',
        },
    }
}

export const optsCreateColumn: RouteShorthandOptions = {
    schema: {
        body: createColumn
    }
}