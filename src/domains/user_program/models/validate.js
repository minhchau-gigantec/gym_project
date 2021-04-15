const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        program_id: { type: 'string' }
    },
    required: ['user_id', 'program_id']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        program_id: { type: 'string' }
    },
}

module.exports = {
    create,
    update
}