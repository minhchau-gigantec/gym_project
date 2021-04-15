const mongo = require('../../../core/mongo')
const {v4: uuid} = require('uuid')

const create_or_update = (schedule_model) => new Promise((resolve, reject) => {
    try{
        const id = uuid()
        const query = {
            user_id: schedule_model.user_id,
            time: schedule_model.time,
        }

        const update = {
            note: schedule_model.note,
            program: schedule_model.program_id,
            updated_at: new Date().toISOString()
        }

        const upsert = {
            _id: id,
            created_at: new Date().toISOString()
        }

        const options = {
            upsert: true,
            returnNewDocument: true
        }

        const collection = mongo.db.collection('schedule')
        var value = await collection.findOneAndUpdate(query,
            {
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

const get_list = () => new Promise(async (resolve, reject) => {
    try{

        const collection = mongo.db.collection('schedule')
        const result = await collection.aggregate([
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            {$unwind: '$program'}
        ]).toArray()

        return resolve(result)
    }catch(error){
        console.log(error)
        return reject(error)
    }
})