const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        training_detail_id: { type: 'string', minLength: 1 },
        weight: { type: 'integer', minimum: 0 },
        note: { type: 'string', minLength: 1 }
    },
    required: ['training_detail_id', 'weight']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        training_detail_id: { type: 'string', minLength: 1 },
        weight: { type: 'integer', minimum: 0 },
        note: { type: 'string', minLength: 1 }
    },
}

module.exports = {
    create,
    update
}