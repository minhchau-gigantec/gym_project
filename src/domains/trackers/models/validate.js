const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string', format: 'date' },
        step: { type: 'integer' },
        weight: { type: 'integer' },
    },
    required: ['time', 'step', 'weight']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string', format: 'date' },
        step: { type: 'integer' },
        weight: { type: 'integer' },
    },
}

module.exports = {
    create,
    update
}