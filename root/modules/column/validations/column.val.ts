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

const queryColumnOne = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1
        },
        title: {
            type: 'string',
        }
    },
    anyOf: [
        {required: ['id']},
        {required: ['title']},
    ]
}

export const optsQueryColumnOne: RouteShorthandOptions = {
    schema: {
        querystring: queryColumnOne
    }
}

const queryColumnAll = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1
        },
        board_id: {
            type: 'integer',
            minimum: 1
        },
        title: {
            type: 'string',
        },
        is_active: {
            type: 'boolean',
        }
    }
}

export const optsQueryColumnAll: RouteShorthandOptions = {
    schema: {
        querystring: queryColumnAll
    }
}