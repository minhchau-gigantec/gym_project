const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
        type: { type: 'string', minLength: 1 }
    },
    required: ['name', 'content', 'type']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
        type: { type: 'string', minLength: 1 }
    }
}

module.exports = {
    create,
    update
}