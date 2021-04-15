const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string', minLength: 1 },
        note: { type: 'string', minLength: 1 }
    },
    required: ['time', 'note']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string', minLength: 1 },
        note: { type: 'string', minLength: 1 }
    }
}

module.exports = {
    create,
    update
}