const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string' },
        min_points: { type: 'integer', minimum: 0 },
        max_points: { type: 'string' }
    },
    required: ['name', 'min_points', 'max_points']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string' },
        min_points: { type: 'integer', minimum: 0 },
        max_points: { type: 'string' }
    }
}

module.exports = {
    create,
    update
}