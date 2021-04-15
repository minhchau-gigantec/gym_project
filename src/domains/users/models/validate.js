const create = {
    additionalProperties: false,
    type: 'object',
    properties: {
        user_id: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string', minLength: 9 },
        address: { type: 'string' },
        avatar: { type: 'string' },
        birthday: { type: 'string', format: 'date' },
        gender: { type: 'string', enum: ['male', 'female'] }
    },
    required: ['user_id', 'first_name', 'last_name', 'email', 'phone', 'address', 'avatar', 'birthday', 'gender']
}

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        phone: { type: 'string', minLength: 9 },
        address: { type: 'string' },
        avatar: { type: 'string' },
        birthday: { type: 'string', format: 'date' },
        gender: { type: 'string', enum: ['male', 'female'] }
    },
}
module.exports = {
    create,
    update
}