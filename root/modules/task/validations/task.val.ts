import {RouteShorthandOptions} from "fastify";

const createTask = {
    type: 'object',
    required: ['board_id', 'column_id', 'title'],
    properties: {
        board_id: {type: 'number', minimum: 1},
        column_id: {type: 'number', minimum: 1},
        title: {type: 'string'},
        desc: {type: 'string'},
        priority_id: {type: 'number'},
        start_date: {type: 'datetime'},
        due_date: {type: 'datetime'},
        completed_at: {type: 'datetime'},
        order_rank: {type: 'number'},
        external_refs: {type: 'object'},
        contact: {type: 'object'},
        has_lead: {type: 'boolean'},
        lead_id: {type: 'number'},
        labels: {type: 'array', items: {type: 'string'}},
        attachments: {type: 'object'},
        checklist: {type: 'object'},
        made_by: {type: 'number'},
        updated_by: {type: 'object'},
        meta: {type: 'object'},
    }
}

export const optsCreateTask: RouteShorthandOptions = {
    schema: {
        body: createTask
    }
}