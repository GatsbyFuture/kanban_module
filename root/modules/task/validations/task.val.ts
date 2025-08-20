import {RouteShorthandOptions} from "fastify";

const createTask = {
    type: "object",
    required: ["board_id", "column_id", "title"],
    properties: {
        board_id: {type: "number", minimum: 1},
        column_id: {type: "number", minimum: 1},
        title: {type: "string", minLength: 1},
        desc: {type: "string"},
        priority_id: {type: "number"},
        start_date: {type: "string", format: "date-time"},
        due_date: {type: "string", format: "date-time"},
        order_rank: {type: "string"},
        external_refs: {type: "object"},
        contact: {type: "object"},
        has_lead: {type: "boolean"},
        lead_id: {type: "number"},
        labels: {
            type: "array",
            items: {type: "string"}
        },
        attachments: {type: "object"},
        checklist: {type: "object"},
        updated_by: {type: "object"},
        meta: {type: "object"}
    },
    additionalProperties: false
};

export const optsCreateTask: RouteShorthandOptions = {
    schema: {
        body: createTask
    }
}

const queryTaskOne = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        board_id: {type: 'integer', minimum: 1},
        column_id: {type: 'integer', minimum: 1},
        title: {type: 'string'},
        priority_id: {type: 'integer', minimum: 1},
    },
    anyOf: [
        {required: ['id']},
        {required: ['board_id']},
        {required: ['column_id']},
        {required: ['title']},
        {required: ['priority_id']}
    ]
}

export const optsQueryTaskOne: RouteShorthandOptions = {
    schema: {
        querystring: queryTaskOne
    }
}

const queryTaskAll = {
    type: 'object',
    properties: {
        board_id: {type: 'integer', minimum: 1},
        column_id: {type: 'integer', minimum: 1},
        priority_id: {type: 'integer', minimum: 1},
    }
}

export const optsQueryTaskAll: RouteShorthandOptions = {
    schema: {
        querystring: queryTaskAll
    }
}