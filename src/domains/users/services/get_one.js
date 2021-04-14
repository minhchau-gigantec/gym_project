const mongo = require('../../../core')

module.exports = (id) => new Promise((resolve, reject) => {
    try{
        const collection = mongo.db.collection('user')
        const result = await collection.findOne({_id: id})
 
        return resolve(result)
    }catch(error){
        console.log(error)
        return reject(error)
    }
})