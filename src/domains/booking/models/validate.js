const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string' },
        note: { type: 'string' }
    },
    required: ['time']
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