const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        program_id: { type: 'string' }
    },
    required: ['program_id']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        program_id: { type: 'string' }
    },
}

module.exports = {
    create,
    update
}