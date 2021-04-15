const { v4: uuid } = require('uuid')
const mongo = require('../../../core/mongo')
const { env } = require('../../../configs/config.service')

const create_or_update = (answer_model) => new Promise(async(resolve, reject) => {
    try {
        const id = uuid()

        const query = {
            question_id: answer_model.question_id,
            name: answer_model.name,
        }

        const update = {
            content: answer_model.content,
            points: answer_model.points,
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

        const collection = mongo.db.collection('answers')
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

const delete_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('answers')
        const exist_answers = await collection.findOne({ _id: id })

        if (!exist_answers) {
            return reject('answers not found')
        }

        const result = collection.deleteOne({ _id: id })
        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


const get_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('answers')
        const result = await collection.aggregate([
            { $match: { _id: id } },
            {
                $lookup: {
                    from: "questions",
                    localField: "question_id",
                    foreignField: "_id",
                    as: "question"
                },
            },
            { $unwind: "$quesion" }
        ]).toArray()

        if (result.length == 0) {
            return reject('answer not found')
        }

        console.log({ result })
        return resolve(result[0])

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list_by_question = (question_id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('answers')
        const result = await collection.aggregate([
            { $match: { question_id } },
            {
                $lookup: {
                    from: 'questions',
                    localField: "question_id",
                    foreignField: '_id',
                    as: 'question'

                }
            },
            { $unwind: '$question' }
        ]).toArray()
        console.log(result)

        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


const get_list = () => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('answers')
        const result = await collection.find().toArray()

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})



module.exports = {
    create_or_update,
    get_one,
    delete_one,
    get_list,
    get_list_by_question
}