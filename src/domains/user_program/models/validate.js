const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        time: { type: 'string' },
        step: { type: 'integer' },
        weight: { type: 'integer' },
    },
    required: ['user_id', 'time', 'step', 'weight']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        time: { type: 'string' },
        step: { type: 'integer' },
        weight: { type: 'integer' },
    },
}

module.exports = {
    create,
    update
}