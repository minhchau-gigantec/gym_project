const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        program_id: { type: 'string', minLength: 1 }
    },
    required: ['program_id']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        program_id: { type: 'string', minLength: 1 }
    },
}

module.exports = {
    create,
    update
}