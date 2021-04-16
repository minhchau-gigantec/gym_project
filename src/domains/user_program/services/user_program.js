const mongo = require('../../../core/mongo')
const { v4: uuid } = require('uuid')

const create_one = (user_id, item) => new Promise(async(resolve, reject) => {
    try {
        //check program exist
        const program = mongo.db.collection('programs')
        const check_program = await program.findOne({ _id: item.program_id })
            // console.log(item.program_id)
            // console.log({ check_program })
        if (check_program === null) {
            return reject('program is not exist')
        }

        const collection = mongo.db.collection('user_programs')

        const query = {
            user_id,
            program_id: item.program_id
        }

        const exist_item = await collection.findOne(query)

        if (exist_item) {
            return reject('user_program is existed')
        }
        const id = uuid()
        const create_item = {
            _id: id,
            user_id,
            program_id: item.program_id,
            created_at: new Date().toISOString(),
            udpated_at: new Date().toISOString()
        }

        await collection.insertOne(create_item)

        const result = await collection.findOne({ _id: id })
        return resolve(result)
    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const delete_one = (user_id, id) => new Promise(async(resolve, reject) => {
    try {
        const collection = mongo.db.collection('user_programs')

        const existed_item = await collection.findOne({ _id: id, user_id })

        if (!existed_item) {
            return reject("user program not found")
        }

        await collection.deleteOne({ _id: id })
        return resolve('delete user program success')

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list_by_user = (user_id) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('user_programs')
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
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            { $unwind: '$program' },
        ]).toArray()

        return resolve(result)


    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

const get_list = () => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('user_programs')
        const result = await collection.aggregate([{
                $lookup: {
                    from: 'user_profiles',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            { $unwind: '$program' },
        ]).toArray()

        return resolve(result)


    } catch (error) {
        console.log(error)
        return reject(error)
    }
})


const get_one = (id) => new Promise(async(resolve, reject) => {
    try {

        const collection = mongo.db.collection('user_programs')
        const check_exist = collection.findOne({ _id: id })
        if (check_exist === null) {
            return reject('user-program not found')
        }

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
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program_id',
                    foreignField: '_id',
                    as: 'program'
                }
            },
            { $unwind: '$program' },
        ]).toArray()


        if (result.length == 0) {
            return reject('user program not found')
        }
        return resolve(result[0])


    } catch (error) {
        console.log(error)
        return reject(error)
    }
})

module.exports = {
    create_one,
    get_one,
    get_list_by_user,
    get_list,
    delete_one
}