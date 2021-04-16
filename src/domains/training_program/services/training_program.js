const mongo = require('../../../core/mongo')
const traning_program_detail = require('../../training_program_detail/services/training_program_detail')
const {v4: uuid} = require('uuid')

module.exports = (traning_model) => new Promise(async (resolve, reject) => {
    try{
        const query = {
            name: traning_model.name
        }

        const collection = mongo.db.collection('traning_programs')
        const existed_item = await collection.findOne(query)

        if(existed_item) {
            return reject('traning program is existed')
        }

        let id_detail_items = []
        const detail_items = traning_model.items.map(row => {
            let id = new uuid()
            id_detail_items.push(id)
            let detail = {
                _id: id,
                sets: row.sets,
                reps: row.reps,
                tempo: row.temp,
                rest: row.rest,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }

            return detail
        })
        // create training_program detail.
        await traning_program_detail(detail_items)

        const training_id = uuid()
        const create_traning = {
            _id: training_id,
            acronym: traning_model.acronym,
            name: traning_model.name,
            items: id_detail_items,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }

        await collection.insertOne(create_traning)

        return resolve(create_traning)


    }catch(error){
        console.log(error)
        return reject(error)
    }
})