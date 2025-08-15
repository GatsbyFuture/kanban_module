import {RouteShorthandOptions} from "fastify";

const createBoard = {
    type: 'object',
    required: ['name', 'settings', 'users'],
    properties: {
        name: {
            type: 'string',
            minLength: 2,
        },
        desc: {
            type: 'string',
        },
        is_private: {
            type: 'boolean',
        },
        meta: {
            type: 'object'
        },
        settings: {
            type: 'object'
        },
        users: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                required: ['user_id', 'role_id'],
                properties: {
                    user_id: {
                        type: 'integer',
                        minimum: 1,
                    },
                    role_id: {
                        type: 'integer',
                        minimum: 1,
                    },
                    meta: {
                        type: 'object',
                    }
                }
            }
        }
    }
}

export const optsCreateBoard: RouteShorthandOptions = {
    schema: {
        body: createBoard
    }
}