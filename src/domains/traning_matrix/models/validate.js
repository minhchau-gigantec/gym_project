const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        program: { type: 'string', minLength: 1 },
        items: {
            additionalProperties: false,
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    day: { type: 'string', minLength: 1 },
                    training_program: { type: 'string', minLength: 1 }
                },
                required: ['day', 'training_program']
            },
            minItems: 1
        }
    },
    required: ['program', 'items']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        program: { type: 'string', minLength: 1 },
        items: {
            additionalProperties: false,
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    day: { type: 'string', minLength: 1 },
                    training_program: { type: 'string', minLength: 1 }
                }
            }
        }
    },
}

module.exports = {
    create,
    update
}