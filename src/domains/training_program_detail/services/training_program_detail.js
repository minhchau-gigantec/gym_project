const mongo = require('../../../core/mongo')

const create_many = (items) => new Promise((resolve, reject) => {
    try{
        const collection = mongo.db.collection('traning_program_detail')

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