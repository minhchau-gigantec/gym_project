const mongo = require('../../../core/mongo')
const traning_program_detail = require('../../training_program_detail/services/training_program_detail')
const { v4: uuid } = require('uuid')

const create_one = (training_model) => new Promise(async(resolve, reject) => {
    console.log(training_model)
    try {
        const query = {
            name: training_model.name
        }

        const collection = mongo.db.collection('training_programs')
        const existed_item = await collection.findOne(query)

        if (existed_item) {
            return reject('traning program is existed')
        }

        let id_detail_items = []
        const detail_items = training_model.items.map(row => {
                const id = uuid()
                id_detail_items.push(id)
                const detail = {
                    _id: id,
                    sets: row.sets,
                    reps: row.reps,
                    tempo: row.tempo,
                    rest: row.rest,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }

                return detail
            })
            // create training_program detail.
        await traning_program_detail.create_many(detail_items)

        const training_id = uuid()
        const create_traning = {
            _id: training_id,
            acronym: training_model.acronym,
            name: training_model.name,
            items: id_detail_items,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await collection.insertOne(create_traning)

        return resolve(create_traning)


    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list = () => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('training_programs')

        const result = await collection.aggregate([
            { $unwind: '$items' },
            {
                $lookup: {
                    from: 'traning_program_details',
                    localField: 'items',
                    foreignField: '_id',
                    as: 'itemObjects'
                }
            },
            { $unwind: '$itemObjects' },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    acronym: { $first: '$acronym' },
                    // items: { $push: '$items'},
                    items: { $push: '$itemObjects' },
                    created_at: { $first: '$created_at' },
                    updated_at: { $first: '$updated_at' }

                }
            }
        ]).toArray()

        return resolve(result)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


module.exports = {
    create_one,
    get_list
}