// const create = {
//     additionalProperties: false,
//     type: 'object',
//     properties: {
//         full_name: { type: 'string' },
//         phone: { type: 'string', minLength: 9 },
//         address: { type: 'string' },
//         avatar: { type: 'string' },
//         birthday: { type: 'string', format: 'date' },
//         gender: { type: 'string', enum: ['male', 'female'] }
//     },
//     required: ['first_name', 'last_name', 'phone', 'address', 'avatar', 'birthday', 'gender']
// }

const update = {
    additionalProperties: false,
    type: 'object',
    properties: {
        fullname: { type: 'string', minLength: 1 },
        phone: { type: 'string', minLength: 9 },
        address: { type: 'string', minLength: 1 },
        avatar: { type: 'string' },
        birthday: { type: 'string', format: 'date' },
        gender: { type: 'string', enum: ['male', 'female'] }
    },
}
module.exports = {
    // create,
    update
}