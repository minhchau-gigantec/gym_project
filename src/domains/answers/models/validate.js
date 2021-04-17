const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        question_id: { type: 'string', minLength: 1 },
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
        points: { type: 'integer', minimum: 0 },
    },
    required: ['question_id', 'name', 'content', 'points']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        question_id: { type: 'string', minLength: 1 },
        name: { type: 'string', minLength: 1 },
        content: { type: 'string', minLength: 1 },
        points: { type: 'integer', minimum: 10 },
    }
}

const submit = {
    additionalProperties: false,
    type: 'object',
    properties: {
        answer_ids: {
            type: ['array', 'string'],
            items: {
                type: 'string',
                minLength: 1
            },
            minItems: 1,
        }
    },
    required: ['answer_ids']
}

const get_list = {
    additionalProperties: false,
    type: 'object',
    properties: {
        answer_ids: {
            type: ['array', 'string'],
            minLength: 1,
            items: {
                type: 'string',
                minLength: 1
            },
            minItems: 1,
        }
    },
    required: ['answer_ids']
}

module.exports = {
    create,
    update,
    submit,
    get_list
}