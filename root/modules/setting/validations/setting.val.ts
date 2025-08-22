import {RouteShorthandOptions} from "fastify";

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