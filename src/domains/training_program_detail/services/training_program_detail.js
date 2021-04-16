const mongo = require('../../../core/mongo')

const create_many = (items) => new Promise(async (resolve, reject) => {
    try{
        const collection = mongo.db.collection('traning_program_details')

        await collection.insertMany(items)
        return resolve(items)

    }catch(error){
        console.log(error)
        return reject(error)
    }
})


module.exports = {
    create_many
}