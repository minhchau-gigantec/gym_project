const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
        types: {
            type: 'array',
            items: {
                type: 'string',
                minLength: 1
            },
            minItems: 1
        }
    },
    required: ['name', 'content', 'types']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
        types: {
            type: 'array',
            items: {
                type: 'string',
                minLength: 1
            }
        }
    }
}

module.exports = {
    create,
    update
}