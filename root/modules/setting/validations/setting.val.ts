import {RouteShorthandOptions} from "fastify";

// FOR BOARD ROLE
const createBoardRole = {
    type: 'object',
    required: ['code', 'name', 'weight'],
    properties: {
        code: {
            type: 'string',
            pattern: '^[A-Z]+$'
        },
        name: {type: 'string'},
        weight: {type: 'number'},
        meta: {type: 'object'}
    }
}

export const optsCreateBoardRole: RouteShorthandOptions = {
    schema: {
        body: createBoardRole,
    }
}

const queryGetOneBoardRole = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        code: {type: 'string'},
        name: {type: 'string'},
    },
    anyOf: [
        {required: ['id']},
        {required: ['code']},
        {required: ['name']}
    ]
}

export const optsGetOneBoardRole: RouteShorthandOptions = {
    schema: {
        querystring: queryGetOneBoardRole,
    }
}

const queryGetAllBoardRole = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        code: {type: 'string'},
        name: {type: 'string'},
    }
}

export const optsGetAllBoardRole: RouteShorthandOptions = {
    schema: {
        querystring: queryGetAllBoardRole,
    }
}

const delManyBoardRoles = {
    type: 'object',
    required: ['ids'],
    properties: {
        ids: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'integer',
                minimum: 1,
            }
        }
    }
}

export const optsDelManyBoardRoles: RouteShorthandOptions = {
    schema: {
        body: delManyBoardRoles
    }
}

// FOR TASK ROLE
const createTaskRole = {
    type: 'object',
    required: ['code', 'name', 'weight'],
    properties: {
        code: {
            type: 'string',
            pattern: '^[A-Z]+$'
        },
        name: {type: 'string'},
        weight: {type: 'number'},
        meta: {type: 'object'}
    }
}

export const optsCreateTaskRole: RouteShorthandOptions = {
    schema: {
        body: createTaskRole,
    }
}

const queryGetOneTaskRole = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        code: {type: 'string'},
        name: {type: 'string'},
    },
    anyOf: [
        {required: ['id']},
        {required: ['code']},
        {required: ['name']}
    ]
}

export const optsGetOneTaskRole: RouteShorthandOptions = {
    schema: {
        querystring: queryGetOneTaskRole,
    }
}

const queryGetAllTaskRole = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        code: {type: 'string'},
        name: {type: 'string'},
    }
}

export const optsGetAllTaskRole: RouteShorthandOptions = {
    schema: {
        querystring: queryGetAllTaskRole,
    }
}

const delManyTaskRoles = {
    type: 'object',
    required: ['ids'],
    properties: {
        ids: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'integer',
                minimum: 1,
            }
        }
    }
}

export const optsDelManyTaskRoles: RouteShorthandOptions = {
    schema: {
        body: delManyTaskRoles
    }
}

// FOR TASK PRIORITY
const createTaskPrio = {
    type: 'object',
    required: ['code', 'name', 'weight'],
    properties: {
        code: {
            type: 'string',
            pattern: '^[A-Z]+$'
        },
        name: {type: 'string'},
        weight: {type: 'number'},
        meta: {type: 'object'}
    }
}

export const optsCreateTaskPrio: RouteShorthandOptions = {
    schema: {
        body: createTaskPrio,
    }
}

const queryGetOneTaskPrio = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        code: {type: 'string'},
        name: {type: 'string'},
    },
    anyOf: [
        {required: ['id']},
        {required: ['code']},
        {required: ['name']}
    ]
}

export const optsGetOneTaskPrio: RouteShorthandOptions = {
    schema: {
        querystring: queryGetOneTaskPrio,
    }
}

const queryGetAllTaskPrio = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        code: {type: 'string'},
        name: {type: 'string'},
    }
}

export const optsGetAllTaskPrio: RouteShorthandOptions = {
    schema: {
        querystring: queryGetAllTaskPrio,
    }
}

const delManyTaskPrio = {
    type: 'object',
    required: ['ids'],
    properties: {
        ids: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'integer',
                minimum: 1,
            }
        }
    }
}

export const optsDelManyTaskPrio: RouteShorthandOptions = {
    schema: {
        body: delManyTaskPrio
    }
}