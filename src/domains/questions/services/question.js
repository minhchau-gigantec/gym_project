const mongo = require('../../../core/mongo')
const { v4: uuid } = require('uuid')

const create_or_update = (question_model) => new Promise(async(resolve, reject) => {
    try {
        const id = uuid()
        const query = {
            name: question_model.name
        }

        const update = {
            content: question_model.content,
            updated_at: new Date().toISOString()
        }

        const insert = {
            _id: id,
            created_at: new Date().toISOString()
        }

        const options = {
            upsert: true,
            returnNewDocument: true
        }

        const collection = mongo.db.collection('questions')
        var { value } = await collection.findOneAndUpdate(query, {
            $set: update,
            $setOnInsert: insert
        }, options)

        if (!value) {
            value = await collection.findOne({ _id: id })
        } else {
            value = await collection.findOne({ _id: value._id })
        }

        return resolve(value)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('questions')
        const result = await collection.findOne({ _id: id })
        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


const get_list = () => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('questions')
        const result = await collection.find().toArray()
        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const delete_one = (id) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('questions')
        const question = await collection.findOne({ _id: id })

        if (!question) {
            return reject("Question not found")
        }

        await collection.deleteOne({ _id: id })

        return resolve('delete question success')

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


module.exports = {
    create_or_update,
    get_list,
    get_one,
    delete_one
}