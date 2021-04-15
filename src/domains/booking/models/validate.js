const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string' },
        program_id: { type: 'string' },
        note: { type: 'string' }
    },
    required: ['time', 'program_id', 'note']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string' },
        note: { type: 'string' }
    }
}

module.exports = {
    create,
    update
}