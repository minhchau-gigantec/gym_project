const mongo = require('../../../core/mongo')
const training_program_detail = require('../../training_program_detail/services/training_program_detail')

const create_one = (use, item_model) => new Promise(async(resolve, reject) => {

    try {
        const {training_detail_id} = item_model
        const training_detail = await training_program_detail.get_one(training_detail_id)

        const user_id = user._id
        const detail = {
            user_id,
            training_detail_id,
            weight: item_model.weight,
            note: item_model.note,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }


        const collection = mongo.db.collection('user_training')
        await collection.insertOne(detail)


        return resolve(detail)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const update_one = (user_id, id, item_model) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('user_training')
        await collection.updateOne({ _id: id, user_id }, {
            $set: item_model
        })

        const result = await collection.findOne({ _id: id, user_id })

        if (!result) {
            return reject('user traning not found')
        }
        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const delete_one = (user_id, id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('user_training')

        const existed_item = await collection.findOne({ _id: id, user_id })

        if (!existed_item) {
            return reject('user training not found')
        }

        await collection.deleteOne({ _id: id, user_id })
        return resolve('Handle success')

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_one_by_user = (user_id, training_detail_id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('user_training')

        const result = await collection.aggregate([
            { $match: { user_id, training_detail_id } },
            {
                $lookup: {
                    from: "user_profiles",
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'training_program_details',
                    localField: 'training_detail_id',
                    foreignField: '_id',
                    as: 'training_program_detail'
                }
            },
            { $unwind: '$training_program_detail' }
        ]).toArray()

        if (result.length == 0) {
            return reject('user training not found')
        }

        return resolve(result[0])

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


const get_list_by_user = (user_id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('user_training')

        const result = await collection.aggregate([
            { $match: { user_id } },
            {
                $lookup: {
                    from: "user_profiles",
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'training_program_details',
                    localField: 'training_detail_id',
                    foreignField: '_id',
                    as: 'training_program_detail'
                }
            },
            { $unwind: '$training_program_detail' }
        ]).toArray()

        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


module.exports = {
    create_one,
    delete_one,
    get_list_by_user,
    get_one_by_user,
    update_one
}