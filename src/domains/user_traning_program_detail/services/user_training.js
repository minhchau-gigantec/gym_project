const mongo = require('../../../core/mongo')

const create_one = (user_id, item_model) => new Promise(async (resolve, reject) => {
    try{
        const detail = {
            user_id,
            training_detail_id: item_model.training_detail_id,
            weight: item_model.weight,
            note: item_model.note,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        const collection = mongo.db.collection('user_training')
        await collection.insertOne(detail)
        return resolve(detail)

    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const delete_one = (user_id, id) => new Promise((resolve, reject) => {
    try{
        const collection = mongo.db.collection('user_training')

        const existed_item = await collection.findOne({_id: id, user_id})

        if (!existed_item) {
            return reject('user training not found')
        }

        await collection.deleteOne({_id: id, user_id})
        return resolve('delete user training success')

    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const get_list_by_user = (user_id) => new Promise((resolve, reject) => {
    try{
        const collection = mongo.db.collection('user_training')

        const existed_item = await collection.aggregate([
            {$match: {_id: id}},
            {$lookup: {
                from: "user_profiles",
                
            }}
        ])

    }catch(error){
        console.log(error)
        return reject(error)
    }
})