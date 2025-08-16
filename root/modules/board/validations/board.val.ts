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

const delBoard = {
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

export const optsDelBoard: RouteShorthandOptions = {
    schema: {
        body: delBoard
    }
}

const querySetting = {
    type: 'object',
    required: ['board_id'],
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        }
    }
}

const updateSetting = {
    type: 'object',
    properties: {
        color: {
            type: 'string',
            minLength: 2,
            maxLength: 24,
        },
        allow_swimlanes: {
            type: 'boolean',
        },
        clm_limits: {
            type: 'integer',
            minimum: 1,
        },
        auto_archive_done: {
            type: 'boolean',
        },
        auto_archive_days: {
            type: 'integer',
            minimum: 1,
        },
        meta: {
            type: 'object'
        }
    },
    anyOf: [
        {required: ['color']},
        {required: ['allow_swimlanes']},
        {required: ['clm_limits']},
        {required: ['auto_archive_done']},
        {required: ['auto_archive_days'],},
        {required: ['meta']},
    ]
}

export const optsUpdateSetting: RouteShorthandOptions = {
    schema: {
        querystring: querySetting,
        body: updateSetting
    }
}

const createBoardUsers = {
    type: 'object',
    required: ['users'],
    properties: {
        users: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                required: ['board_id', 'user_id', 'role_id'],
                properties: {
                    board_id: {
                        type: 'integer',
                        minimum: 1,
                    },
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

export const optsCreateUsers: RouteShorthandOptions = {
    schema: {
        body: createBoardUsers,
    }
}

const queryBoardUser = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        },
        board_id: {
            type: 'integer',
            minimum: 1,
        },
        user_id: {
            type: 'integer',
            minimum: 1,
        },
        role_id: {
            type: 'integer',
            minimum: 1,
        }
    }
}

export const optsQueryUser: RouteShorthandOptions = {
    schema: {
        querystring: queryBoardUser,
    }
}

const delBoardUser = {
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

export const optsDelUser: RouteShorthandOptions = {
    schema: {
        body: delBoardUser,
    }
}