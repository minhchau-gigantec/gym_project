const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string', minLength: 1 },
        step: { type: 'integer', minimum: 0 },
        weight: { type: 'integer', minimum: 0 },
    },
    required: ['time', 'step', 'weight']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        time: { type: 'string', minLength: 1 },
        step: { type: 'integer', minimum: 0 },
        weight: { type: 'integer', minimum: 0 },
    },
    required: ['time']
}

module.exports = {
    create,
    update
}