const mongo = require('../../../core/mongo')
const { v4: uuid } = require('uuid')

const create_one = (user_id, tracker_model) => new Promise(async(resolve, reject) => {
    try {
        const query = {
            user_id: user_id,
            time: tracker_model.time
        }

        const collection = mongo.db.collection('trackers')
        const existed_tracker = await collection.findOne(query)
        console.log({ existed_tracker })
        if (existed_tracker != null) {
            return reject('tracker is existed')
        }

        const id = uuid()
        const item = {
            _id: id,
<<<<<<< HEAD
=======
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            time: tracker_model.time,
>>>>>>> master
            user_id,
            step: tracker_model.step,
            weight: tracker_model.weight,
            time: tracker_model.time,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

        await collection.insertOne(item)
        const result = await collection.findOne({ _id: id })
<<<<<<< HEAD
            // console.log({ result })
=======
>>>>>>> master
        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

<<<<<<< HEAD
const update_one = (id, tracker_model) => new Promise(async(resolve, reject) => {
    try {
        const update = {
            // _id: id,
            time: tracker_model.time,
            step: tracker_model.step,
            weight: tracker_model.weight,
            updated_at: new Date().toISOString()
        }
        const options = {
            returnNewDocument: true
        }

        const collection = mongo.db.collection('trackers')
        const existed_tracker = await collection.findOne({ _id: id })
        console.log({ existed_tracker })
        if (existed_tracker === null) {
            return reject('tracker is not existed')
        }

        const result = await collection.updateOne({ _id: id }, {
            $set: update
        }, options)
=======
const update_one = (user_id, id, tracker_model) => new Promise(async(resolve, reject) => {
    try {
        const query = {
            user_id,
            _id: id
        }

        const collection = mongo.db.collection('trackers')
        await collection.updateOne(query, {
            $set: {...tracker_model, updated_at: new Date().toISOString() }
        })
        const result = await collection.findOne(query)
>>>>>>> master

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

const get_one = (user_id, id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('trackers')
        const result = await collection.aggregate([
            { $match: { _id: id, user_id } },
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

<<<<<<< HEAD
        await collection.deleteOne({ _id: id })
=======
        await collection.deleteOne({ _id: id, user_id})
>>>>>>> master
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