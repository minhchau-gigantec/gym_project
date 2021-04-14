const {v4: uuid} = require('uuid')
const mongo = require('../../../core/mongo')



module.exports = (user_model) => new Promise((resolve, reject) => {
    try{

        const query = {
            _id: user_model.user_id,
        }

        const update =  {
            first_name: user_model.first_name,
            last_name: user_model.last_name,
            phone: user_model.phone,
            address: user_model.address,
            avatar: user_model.avatar,
            birthday: user_model.avatar,
            gender: user_model.gender,
            updated_at: new Date().toISOString()
        }
        const insert = {
            created_at: new Date().toISOString(),
        }
        const options = {
            upsert: true,
            returnNewDocument: true
        }

        const collection = mongo.db.collection('user')
        const result = await collection.findOneAndUpdate( query, {
            $set: update,
            $setOnInsert: insert
        }, options)

        return resolve(result)
    }catch(error){
        console.log(error)
        return reject(error)

    }


})