const create_question = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string' },
        content: { type: 'string' }
    },
    required: ['name', 'content']
}

module.exports = {
    create_question
}