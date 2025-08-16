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

const queryBoard = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        },
        name: {
            type: 'string',
        },
        made_by: {
            type: 'integer',
            minimum: 1,
        },
        is_active: {
            type: 'boolean',
        }
    },
    anyOf: [
        {required: ['id']},
        {required: ['name']},
        {required: ['made_by']},
        {required: ['is_active']}
    ]
}

export const optsQueryBoard: RouteShorthandOptions = {
    schema: {
        querystring: queryBoard
    }
}

const queryBoardAll = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        },
        name: {
            type: 'string',
        },
        made_by: {
            type: 'integer',
            minimum: 1,
        },
        is_active: {
            type: 'boolean',
        }
    }
}

export const optsQueryBoardAll: RouteShorthandOptions = {
    schema: {
        querystring: queryBoardAll
    }
}

const updateBoard = {
    type: 'object',
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
        is_active: {
            type: 'boolean',
        }
    },
    anyOf: [
        {required: ['name']},
        {required: ['desc']},
        {required: ['is_private']},
        {required: ['meta']},
        {required: ['is_active']},
    ]
}

export const optsUpdateBoard: RouteShorthandOptions = {
    schema: {
        querystring: queryBoard,
        body: updateBoard
    }
}