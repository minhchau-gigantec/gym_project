const { v4: uuid } = require('uuid')
const mongo = require('../../../core/mongo')
const { options } = require('../../answers/router')

const create_one = (program_model) => new Promise(async(resolve, reject) => {
    try {

        const query = {
            name: program_model.name
        }

        const collection = mongo.db.collection('programs')
        const existed_item = await collection.findOne(query)

        if (existed_item) {
            return reject("program is existed")
        }

        const id = uuid()
        const create_item = {
            _id: id,
            name: program_model.name,
            min_points: parseInt(program_model.min_points),
            max_points: parseInt(program_model.max_points),
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

        const options = {
            returnNewDocument: true
        }
        const collection = mongo.db.collection('programs')

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

const delete_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('programs')
        const existed_program = await collection.findOne({ _id: id })

        if (!existed_program) {
            return reject('program not found')
        }

        await collection.deleteOne({ _id: id })
        return resolve('delete program success')
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


const get_one = (id) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('programs')
        const program = await collection.findOne({ _id: id })

        if (!program) {
            return reject('program not found')
        }
        return resolve(program)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list = () => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('programs')
        const programs = await collection.find().toArray()

        return resolve(programs)

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