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

const queryColumnUpdate = {
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
        is_active: {
            type: 'boolean',
        }
    },
    anyOf: [
        {required: ['id']},
        {required: ['board_id']},
        {required: ['title']},
        {required: ['is_active']},
    ]
}

const updateColumn = {
    type: 'object',
    properties: {
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
        is_active: {
            type: 'boolean',
        }
    },
    anyOf: [
        {required: ['title']},
        {required: ['position']},
        {required: ['wip_limit']},
        {required: ['is_backlog']},
        {required: ['is_done']},
        {required: ['meta']},
        {required: ['is_active']},
    ]
}

export const optsUpdateColumn: RouteShorthandOptions = {
    schema: {
        querystring: queryColumnUpdate,
        body: updateColumn
    }
}