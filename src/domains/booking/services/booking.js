const { v4: uuid } = require('uuid')
const mongo = require('../../../core/mongo')

const create_one = (user_id, booking_model) => new Promise(async(resolve, reject) => {
    try {
        const id = uuid()

        const create_booking = {
            _id: id,
            user_id,
            time: booking_model.time,
            note: booking_model.note,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        const collection = mongo.db.collection('booking')
        await collection.insertOne(create_booking)

        const result = await collection.findOne({ _id: id })
        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const update_one = (user_id, id, booking_model) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('booking')
        const update = {
            note: booking_model.note,
            time: booking_model.time,
            updated_at: new Date().toISOString()
        }

        const options = {
            returnNewDocument: true
        }

        const result = await collection.updateOne({ _id: id, user_id}, {
            $set: update
        }, options)

        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


const get_one = (user_id, id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('booking')
        const result = await collection.aggregate([
            { $match: { _id: id, user_id} },
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
            return reject('booking not found')
        }
        return resolve(result[0])

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list = () => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('booking')
        const result = await collection.aggregate([
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
        const collection = mongo.db.collection('booking')
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


const delete_one = (user_id, id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection("booking")

        const existed_booking = await collection.findOne({ _id: id, user_id })
        if (!existed_booking) {
            return reject('booking not found')
        }
        await collection.deleteOne({ _id: id })
        return resolve('delete booking success')

    } catch (error) {
        console.log(error)
        return
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