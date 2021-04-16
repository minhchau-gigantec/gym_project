const mongo = require('../../../core/mongo')
const { v4: uuid } = require('uuid')

const create_one = (item_model) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('training_matrix')
        const query = {
            program: item_model.program
        }

        const existed_item = await collection.findOne(query)

        if (existed_item) {
            return reject('training matrix is existed')
        }

        const create_matrix = {
            _id: uuid(),
            program: item_model.program,
            items: item_model.items,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }


        await collection.insertOne(create_matrix)

        return resolve(create_matrix)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

// get traning maxtrix by program
const get_one_by_program = (program_id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('training_matrix')

        const result = await collection.findOne({ program: program_id })

        if (!result) {
            return reject('training matrix not found')
        }

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const delete_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('training_matrix')

        const existed_item = collection.findOne({ _id: id })
        if (!existed_item) {
            return reject('training matrix not found')
        }

        await collection.deleteOne({ _id: id })
        return resolve("delete training matrix success")

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})
module.exports = {
    create_one,
    get_one_by_program,
    delete_one
}