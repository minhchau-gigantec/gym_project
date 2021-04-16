const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string' },
        content: { type: 'string' },
        type: {type: 'string'}
    },
    required: ['name', 'content', 'type']
}

module.exports = {
    create
}