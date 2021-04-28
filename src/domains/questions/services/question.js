const mongo = require('../../../core/mongo')
const { v4: uuid } = require('uuid')

const create_one = (question_model) => new Promise(async(resolve, reject) => {
    try {
        const id = uuid()
        const query = {
            name: question_model.name
        }

        const collection = mongo.db.collection('questions')

        const existed_item = await collection.findOne(query)

        if (existed_item) {
            return reject("question is existed")
        }

        const create_item = {
            _id: id,
            name: question_model.name,
            content: question_model.content,
            types: question_model.types,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await collection.insertOne(create_item)
        const result = await collection.findOne({ _id: id })

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const update_one = (id, item) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('questions')

        const options = {
            returnNewDocument: true
        }
        await collection.updateOne({ _id: id }, {
            $set: item
        }, options)

        const result = await get_one(id)

        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('questions')
        const result = await collection.aggregate([
            { $match: { _id: id } },
            {
                $lookup: {
                    from: 'answers',
                    localField: "_id",
                    foreignField: 'question_id',
                    as: 'answers'
                }
            },
        ]).toArray()

        if (result.length === 0) {
            return reject("question not found")
        }
        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


const get_list = () => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('questions')
        const result = await collection.aggregate([{
            $lookup: {
                from: 'answers',
                localField: "_id",
                foreignField: 'question_id',
                as: 'answers'
            }
        }, ]).toArray()
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

        const answer_collection = mongo.db.collection('answers')
        answer_collection.deleteMany({ question_id: id })

        return resolve('delete question success')

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


module.exports = {
    create_one,
    update_one,
    get_list,
    get_one,
    delete_one
}