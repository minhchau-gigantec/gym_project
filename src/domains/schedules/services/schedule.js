const mongo = require('../../../core/mongo')
const { v4: uuid } = require('uuid')

const create_one = (user_id, schedule_model) => new Promise(async(resolve, reject) => {
    try {
        const id = uuid()
        const query = {
            user_id,
            time: schedule_model.time,
        }
        const collection = mongo.db.collection('schedules')

        const existed_item = await collection.findOne(query)

        if (existed_item) {
            return reject('schedule is existed')
        }

        const create_item = {
            _id: id,
            user_id,
            note: schedule_model.note,
            time: schedule_model.time,
            program: schedule_model.program_id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }


        await collection.insertOne(create_item)
        const result = await collection.findOne({ _id: id })

        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const update_one = (id, item) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('schedules')
        const options = {
            returnNewDocument: true
        }

        const result = collection.updateOne({ _id: id }, {
            $set: item
        }, options)

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list = () => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('schedules')
        const result = await collection.aggregate([{
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            { $unwind: '$program' },
            {
                $lookup: {
                    from: 'user_profiles',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' }
        ]).toArray()

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list_by_user = (user_id) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('schedules')
        const result = await collection.aggregate([
            { $match: { user_id } },
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            { $unwind: '$program' },
            {
                $lookup: {
                    from: 'user_profiles',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' }
        ]).toArray()

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_one = (id) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('schedules')
        const result = await collection.aggregate([
            { $match: { _id: id } },
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            { $unwind: '$program' },
            {
                $lookup: {
                    from: 'user_profiles',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' }
        ]).toArray()

        if(result.length == 0) {
            return reject('shedule not found')
        }

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const delete_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('schedules')
        const exsted_schedule = await collection.findOne({ _id: id })

        if (!exsted_schedule) {
            return reject('schedule not found')
        }
        await collection.deleteOne({ _id: id })
        return resolve('delete schedule success')

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


module.exports = {
    create_one,
    update_one,
    get_one,
    get_list,
    get_list_by_user,
    delete_one
}