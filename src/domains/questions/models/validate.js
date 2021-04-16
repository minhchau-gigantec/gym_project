const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string' },
        content: { type: 'string' },
        type: { type: 'string' }
    },
    required: ['name', 'content', 'type']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
        type: { type: 'string' }
    }
}

module.exports = {
    create,
    update
}