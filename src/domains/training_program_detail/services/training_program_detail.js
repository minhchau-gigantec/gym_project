const mongo = require('../../../core/mongo')

const create_many = (items) => new Promise(async (resolve, reject) => {
    try{
        const collection = mongo.db.collection('training_program_details')

        await collection.insertMany(items)
        return resolve(items)

    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const delete_many = (id_items) => new Promise(async (resolve, reject) => {
    try{
        const collection = mongo.db.collection('training_program_details')
        
        await collection.deleteMany({_id: {$in: id_items}})

        return resolve('delete training program details success')
    }catch(error){
        console.log(error)
        return reject(error)
    }
}) 


module.exports = {
    create_many,
    delete_many
}