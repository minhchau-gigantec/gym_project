const { v4: uuid } = require('uuid')
const mongo = require('../../../core/mongo')

const create_one = (user_model) => new Promise(async(resolve, reject) => {
    try {
        const id = uuid()

        const item = {
            _id: id,
            auth_id: user_model.user_id,
            first_name: user_model.first_name,
            last_name: user_model.last_name,
            phone: user_model.phone,
            address: user_model.address,
            avatar: user_model.avatar,
            birthday: user_model.avatar,
            gender: user_model.gender,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        const collection = mongo.db.collection('user_profiles')
        await collection.insertOne(item)
        const result = collection.findOne({ _id: id })

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)

    }
})


const get_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('user_profiles')
        const result = await collection.findOne({ _id: id })

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const update_one = (id, item) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('user_profiles')

        const options = {
            returnNewObject: true
        }
        const result = await collection.updateOne({ _id: id }, {
            $set: item
        }, options)

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

module.exports = {
    update_one,
    get_one,
    create_one
}