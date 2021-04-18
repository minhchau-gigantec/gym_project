const axios = require('axios')
const {env} = require('../../../configs/config.service')

const create_one = (item) => new Promise(async (resolve, reject) => {
    try{
        const {AIR_USER_TRAINING_URL, AIR_TOKEN} = env.config

        const format_item = {
            records: [
                {
                    fields: item
                }
            ]
        }
    
        const response = await axios.post(AIR_USER_TRAINING_URL, format_item, {
            headers: {Authorization: "Bearer " + AIR_TOKEN}
        })
    
        if(response.status != 200){
            return reject("create user training to airtable failure")
        }

        const result = response.data.records

        // console.log({result})

        if(result.length == 0 ){
            return reject('create user training failure')
        }
        return resolve(result[0])

    }catch(error){
        return reject(error)
    }
})

const update_one = (id, user_training_model) => new Promise(async (resolve, reject) => {
    try{
        const format_item = {
            records: [
                {
                    id,
                    fields: user_training_model
                }
            ]
        }

        const {AIR_USER_TRAINING_URL, AIR_TOKEN} = env.config

        const result = await axios.patch(AIR_USER_TRAINING_URL, format_item, {
            headers: {Authorization: "Bearer " + AIR_TOKEN}
        })

        if(result.status != 200){
            return reject("update user training to airtable failure")
        }

        return resolve("update to user training to airtable success")
    }catch(error){
        console.log(error)
        return reject(error)
    }
})

module.exports = {
    create_one,
    update_one
}