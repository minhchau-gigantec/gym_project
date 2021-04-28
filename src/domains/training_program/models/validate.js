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
                    name: { type: 'string', minLength: 1 },
                    sets: { type: 'integer', minimum: 0 },
                    reps: { type: 'string', minLength: 1 },
                    tempo: { type: 'string', minLength: 1 },
                    rest: { type: 'string', minLength: 1 },
                },
                required: ['sets', 'reps', 'tempo', 'rest']
            },
            minItems: 1
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
                    name: { type: 'string', minLength: 1 },
                    sets: { type: 'integer', minimum: 0 },
                    reps: { type: 'string', minLength: 1 },
                    tempo: { type: 'string', minLength: 1 },
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