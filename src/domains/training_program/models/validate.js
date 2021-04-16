const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        acronym: { type: 'string', minLength: 1 },
        sets: { type: 'integer', minimum: 0 },
        reps: { type: 'string', minLength: 1 },
        temp: { type: 'string', minLength: 1 },
        rest: { type: 'string', minLength: 1 },
    },
    required: ['name', 'acronym', 'sets', 'reps', 'temp', 'rest']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        acronym: { type: 'string', minLength: 1 },
        sets: { type: 'integer', minimum: 0 },
        reps: { type: 'string', minLength: 1 },
        temp: { type: 'string', minLength: 1 },
        rest: { type: 'string', minLength: 1 },
    },
}

module.exports = {
    create,
    update
}