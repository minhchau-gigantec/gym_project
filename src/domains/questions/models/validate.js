const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 }
    },
    required: ['name', 'content']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 }
    }
}

module.exports = {
    create,
    update
}