const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        target: { type: 'string', minLength: 1 },
        duration: { type: 'string', minLength: 1 },
        goals: { type: 'string', minLength: 1 },
        min_points: { type: 'integer', minimum: 0 },
        max_points: { type: 'integer', minimum: 0 }
    },
    required: ['name', 'target', 'duration', 'goals', 'min_points', 'max_points']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        target: { type: 'string', minLength: 1 },
        duration: { type: 'string', minLength: 1 },
        goals: { type: 'string', minLength: 1 },
        min_points: { type: 'integer', minimum: 0 },
        max_points: { type: 'integer', minimum: 0 }
    }
}

module.exports = {
    create,
    update
}