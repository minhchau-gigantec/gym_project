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

        const collection = mongo.db.collection('schedules')
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

        const collection = mongo.db.collection('schedules')
        const result = await collection.aggregate([
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            {$unwind: '$program'},
            {
                $lookup: {
                    from: 'user_profiles',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {$unwind: '$user'}
        ]).toArray()

        return resolve(result)
    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const get_list_by_user = (user_id) => new Promise(async (resolve, reject) => {
    try{

        const collection = mongo.db.collection('schedules')
        const result = await collection.aggregate([
            {$match: {user_id}},
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            {$unwind: '$program'},
            {
                $lookup: {
                    from: 'user_profiles',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {$unwind: '$user'}
        ]).toArray()

        return resolve(result)
    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const get_one = (id) => new Promise(async (resolve, reject) => {
    try{

        const collection = mongo.db.collection('schedules')
        const result = await collection.aggregate([
            {$match: {_id: id}},
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            {$unwind: '$program'},
            {
                $lookup: {
                    from: 'user_profiles',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {$unwind: '$user'}
        ]).toArray()

        return resolve(result)
    }catch(error){
        console.log(error)
        return reject(error)
    }
})

const delete_one = (id) => new Promise(async (resolve, reject) => {
    try{
        const collection = mongo.db.collection('schedules')
        const exsted_schedule = await collection.finOne({_id: id})

        if(!exsted_schedule){
            return reject('schedule not found')
        }
        await collection.deleteOne({_id: id})
        return resolve('delete schedule success')

    }catch(error) {
        console.log(error)
        return reject(error)
    }
})


module.exports  = {
    create_or_update,
    get_one,
    get_list,
    get_list_by_user,
    delete_one
}