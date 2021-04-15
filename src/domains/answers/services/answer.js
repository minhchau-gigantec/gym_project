const { v4: uuid } = require('uuid')
const mongo = require('../../../core/mongo')
const { env } = require('../../../configs/config.service')

<<<<<<< HEAD
const create_or_update = (answer_model) => new Promise(async(resolve, reject) => {
    try {
        const id = uuid()
=======
const create_one = (answer_model) => new Promise(async (resolve, reject) => {
    try{
>>>>>>> c269e58743e683297ecc8aabd4bccbf8edc81888

        const query = {
            question_id: answer_model.question_id,
            name: answer_model.name,
        }

        const collection = mongo.db.collection('answers')
        const existed_item = await collection.findOne(query)

        if(existed_item){
            return reject('answer is existed')
        }

        const id = uuid()

        const create_item  = {
            _id: id,
            question_id: answer_model.question_id,
            name: answer_model.name,
            content: answer_model.content,
            points: answer_model.points,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await collection.insertOne(create_item)
    
        const result = await collection.findOne({_id: id})
        return resolve(result)

    }catch(error){
        console.log(error)
        return reject(error)
    }

})

const update_one = (id, item) => new Promise((resolve, reject) => {
    try{
        const options = {
<<<<<<< HEAD
            upsert: true,
=======
>>>>>>> c269e58743e683297ecc8aabd4bccbf8edc81888
            returnNewDocument: true
        }

        const collection = mongo.db.collection('answers')
<<<<<<< HEAD
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
=======
        const result = await collection.updateOne({_id: id}, {
            $set: item
        }, options)
        return resolve(result)
>>>>>>> c269e58743e683297ecc8aabd4bccbf8edc81888

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
    create_one,
    update_one,
    get_one,
    delete_one,
    get_list,
    get_list_by_question
}