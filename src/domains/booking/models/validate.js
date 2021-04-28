const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string', format: 'date' },
        note: { type: 'string', minLength: 1 }
    },
    required: ['time']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string', format: 'date' },
        note: { type: 'string', minLength: 1 }
    }
}

module.exports = {
    create,
    update
}