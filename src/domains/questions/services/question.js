const mongo = require('../../../core/mongo')
const {v4: uuid} = require('uuid')

const create_one = (question_model) => new Promise(async (resolve, reject) => {
    try{
        const id = uuid()
        const query = {
            name: question_model.name
        }

        const collection = mongo.db.collection('questions')

        const existed_item = await collection.findOne(query)

        if(existed_item){
            return reject("question is existed")
        }

        const create_item = {
            _id: id,
            name: question_model.name,
            content: question_model.content,
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

const update_one = (id, item) => new Promise(async (req, res) => {
    try{
        const collection = mongo.db.collection('questions')

        const options = {
            returnNewDocument: true
        }
        const result = await collection.updateOne({_id: id},{
            $set: item
        }, options)

        return resolve(result)

    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const get_one = (id) => new Promise(async (resolve, reject) => {
    try{
        const collection = mongo.db.collection('questions')
        const result = await collection.findOne({_id: id})
        return resolve(result)

    }catch(error){
        console.log(error)
        return reject(error)
    }
})


const get_list = () => new Promise(async (resolve, reject) => {
    try{
        const collection = mongo.db.collection('questions')
        const result = await collection.find()
        return resolve(result)

    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const delete_one = (id) => new Promise(async (resolve, reject) => {
    try{

        const collection = mongo.db.collection('questions')
        const question = await collection.findOne({_id: id})

        if(!question){
            return reject("Question not found")
        }

        await collection.deleteOne({_id: id})

        return resolve('delete question success')

    }catch(error){
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