import {RouteShorthandOptions} from "fastify";

const createBoard = {
    type: 'object',
    required: ['code', 'name', 'weight'],
    properties: {
        code: {type: 'string'},
        name: {type: 'string'},
        weight: {type: 'number'},
        meta: {type: 'object'}
    }
}

export const optsCreateBoard: RouteShorthandOptions = {
    schema: {
        body: createBoard,
    }
}