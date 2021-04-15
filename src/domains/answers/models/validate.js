const create_answer = {
    additionalProperties: false,
    type: 'object',
    properties: {
        question_id: { type: 'string' },
        name: { type: 'string' },
        content: { type: 'string' },
        points: { type: 'integer' },
    },
    required: ['question_id', 'name', 'content', 'points']
}

module.exports = {
    create_answer
}