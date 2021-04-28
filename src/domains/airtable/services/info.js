const axios = require('axios')
const {env} = require('../../../configs/config.service')
const {v4: uuid} = require('uuid')

const create_user_info = info => new Promise(async (resolve, reject) => {
    try{
        const {AIR_TABLE_USER_INFO, AIR_TOKEN} = env.config
        const {email, phone, name} = info

        const user_info = {
            records: [
                {
                    fields:{
                        id: uuid(),
                        email,
                        phone,
                        name,
                        created_at: new Date().toISOString()
                    }
                }
            ]
        }
    
        const response = await axios.post(AIR_TABLE_USER_INFO, user_info, {
            headers: {Authorization: 'Bearer ' + AIR_TOKEN}
        })

        if(response.status != 200){
            return reject('create user info to airtable failure')
        }

        return resolve('create user info to airtable success')

    }catch(error){
        console.log(error)
        return reject(error)
    }
})


const create_information = (info) => new Promise(async (resolve, reject) => {
    try{
        const {AIR_TABLE_INFORMATION, AIR_TOKEN} = env.config
        const {email, phone, name, my_thoughts} = info

        const user_info = {
            records: [
                {
                    fields:{
                        id: uuid(),
                        email,
                        phone,
                        name,
                        my_thoughts, 
                        created_at: new Date().toISOString()
                    }
                }
            ]
        }
    

        const response = await axios.post(AIR_TABLE_INFORMATION, user_info, {
            headers: {Authorization: 'Bearer ' + AIR_TOKEN}
        })

        if(response.status != 200){
            return reject('create user info to airtable failure')
        }

        return resolve('create user info to airtable success')

    }catch(error){
        console.log(error)
        return reject(error)
    }
})

module.exports = {
    create_user_info,
    create_information
}