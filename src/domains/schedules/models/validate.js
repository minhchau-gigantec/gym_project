const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        time: { type: 'string' },
        note: { type: 'string' },
        program_id: { type: 'string' }
    },
    required: ['user_id', 'time', 'note', 'program_id']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        time: { type: 'string' },
        note: { type: 'string' },
        program_id: { type: 'string' }
    }
}

module.exports = {
    create,
    update
}