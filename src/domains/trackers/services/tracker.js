const mongo = require('../../../core/mongo')
const { v4: uuid } = require('uuid')

const create_one = (user_id, tracker_model) => new Promise(async(resolve, reject) => {
    try {
        const query = {
            user_id,
            time: tracker_model.time
        }

        const collection = mongo.db.collection('trackers')
        const existed_tracker = await collection.findOne(query)

        if (existed_tracker) {
            return reject('tracker is existed')
        }

        const id = uuid()
        const item = {
            _id: id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user_id,
            step: tracker_model.step,
            weight: tracker_model.weight
        }

        await collection.insertOne(item)
        const result = await collection.fineOne({ _id: id })
        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const update_one = (user_id, tracker_model) => new Promise(async(resolve, reject) => {
    try {
        const query = {
            user_id,
            time: tracker_model.time
        }
        const options = {
            returnNewDocument: true
        }

        const collection = mongo.db.collection('trackers')
        const result = await collection.updateOne(query, {
            $set: {...tracker_model, updated_at: new Date().toISOString() }
        }, options)

        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list = () => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('trackers')
        const result = await collection.aggregate([{
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
        return reject(result)
    }
})

const get_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('trackers')
        const result = await collection.aggregate([
            { $match: { _id: id } },
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

        if (result.length == 0) {
            return reject('tracker not found')
        }

        return resolve(result[0])

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list_by_user = (user_id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('trackers')
        const result = await collection.aggregate([
            { $match: { user_id } },
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

const delete_one = (id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('trackers')

        const existed_item = await collection.findOne({ _id: id })

        if (!existed_item) {
            return reject("tracker not found")
        }

        await collection.delete_one({ _id: id })
        return resolve("delete tracker success")
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

module.exports = {
    create_one,
    update_one,
    get_list,
    get_one,
    get_list_by_user,
    delete_one
}