const {v4: uuid} = require('uuid')
const mongo = require('../../../core/mongo')

const create_or_update = (program_model) => new Promise(async (resolve, reject) => {
    try{
        const id = uuid()

        const query = {
            name: program_model.name
        }

        const update = {
            min_points: program_model.min_points,
            max_points: program_model.max_points,
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

        const collection = mongo.db.collection('programs')
        var {value} = await collection.findOneAndUpdate(query, {
            $set: update,
            $setOnInsert: insert
        }, options)

        if(!value){
            value = await collection.findOne({_id: id})
        }else {
            value = await collection.findOne({_id: value._id})
        }

        return resolve(value)
    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const delete_one = (id) => new Promise(async (resovle, reject ) => {
    try{
        const collection = mongo.db.collection('programs')
        const existed_program = await collection.findOne({_id: id})

        if(!existed_program) {
            return reject('program not found')
        }

        await collection.deleteOne({_id: id})
        return resolve('delete program success')
    }catch(error){
        console.log(error)
        return reject(error)
    }
})


const get_one = (id) => new Promise(async (resolve, reject) => {
    try{

        const collection = mongo.db.collection('programs')
        const program = await collection.findOne({_id: id})
        return resolve(program)

    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const get_list = () => new Promise(async (resolve, reject) => {
    try{
        const collection = mongo.db.collection('programs')
        const programs = await collection.find().toArray()

        return resolve(programs)

    }catch(error){
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