const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string' },
        content: { type: 'string' }
    },
    required: ['name', 'content']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string' },
        content: { type: 'string' }
    }
}

module.exports = {
    create,
    update
}