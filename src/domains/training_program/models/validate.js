const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        acronym: { type: 'string', minLength: 1 },
        items: {
            additionalProperties: false,
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    sets: { type: 'integer', minimum: 0 },
                    reps: { type: 'string', minLength: 1 },
                    temp: { type: 'string', minLength: 1 },
                    rest: { type: 'string', minLength: 1 },
                },
                required: ['sets', 'reps', 'temp', 'rest']
            }
        }
    },
    required: ['name', 'acronym', 'items']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        acronym: { type: 'string', minLength: 1 },
        items: {
            type: 'array',
            items: {
                additionalProperties: false,
                type: 'object',
                properties: {
                    sets: { type: 'integer', minimum: 0 },
                    reps: { type: 'string', minLength: 1 },
                    temp: { type: 'string', minLength: 1 },
                    rest: { type: 'string', minLength: 1 },
                }
            }
        }
    },
}

module.exports = {
    create,
    update
}