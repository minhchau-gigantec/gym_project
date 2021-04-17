const axios = require('axios')
const {env} = require('../../../configs/config.service')

const create_one = (user, item) => new Promise(async (resolve, reject) => {
    try{
        const {AIR_BOOKING_URL, AIR_TOKEN} = env.config
        const format_item = {
            records: [
                {
                    fields: {
                        _id: item._id,
                        user_id: user._id,
                        user_email: user.email,
                        time: item.time,
                        note: item.note
                    }
                }
            ]
        }
    
        const response = await axios.post(AIR_BOOKING_URL, format_item, {
            headers: {Authorization: "Bearer " + AIR_TOKEN}
        })
    
        if(response.status != 200){
            return reject("create booking to airtable failure")
        }

        const result = response.data.records

        console.log({result})

        if(result.length == 0 ){
            return reject('create booking failure')
        }
        return resolve(result[0])

    }catch(error){
        return reject(error)
    }
})

const update_one = (id, booking_model) => new Promise(async (resolve, reject) => {
    try{
        const format_item = {
            records: [
                {
                    id,
                    fields: booking_model
                }
            ]
        }

        const {AIR_BOOKING_URL, AIR_TOKEN} = env.config

        const result = await axios.patch(AIR_BOOKING_URL, format_item, {
            headers: {Authorization: "Bearer " + AIR_TOKEN}
        })

        if(result.status != 200){
            return reject("update to booking to airtable failure")
        }

        return resolve("update to booking success")
    }catch(error){
        console.log(error)
        return reject(error)
    }
})

module.exports = {
    create_one,
    update_one
}