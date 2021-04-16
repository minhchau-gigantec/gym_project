const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        target: { type: 'string', minLength: 1 },
        duration: { type: 'string', minLength: 1 },
        goals: { type: 'string', minLength: 1 }
    },
    required: ['name', 'target', 'duration', 'goals']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        target: { type: 'string', minLength: 1 },
        duration: { type: 'string', minLength: 1 },
        goals: { type: 'string', minLength: 1 }
    }
}

module.exports = {
    create,
    update
}