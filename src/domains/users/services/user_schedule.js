const schedule = require('node-schedule')
const {env} = require('../../../configs/config.service')
const axios = require('axios')
const user_profile = require('./user_profile')

const update_session = () => new Promise(async (resolve, reject) => {
    try{
        const {AIR_SESSION_URL, AIR_TOKEN} = env.config

        const response = await axios.get(AIR_SESSION_URL, {
            headers: {
                Authorization: "Bearer " + AIR_TOKEN
            }
        })
    
        if(response.status != 200){
            console.log("update session failure")
            return resolve("update session failure")
        }

        const session_list = response.data.records
        update_sessions = session_list.map(async (item) => {
            const {user_email, session, updated_at} = item.fields
            // s
            return user_profile.update_one(user_email, {
                session,
                checked_at: updated_at ||  new Date().toISOString(),
            })
        })

        await Promise.all(update_sessions)
        return resolve('update session success')

    }catch(error){
        console.log(error)
        return resolve("update session failure")
    }
})

update_session_schedule = () => {
    const job = schedule.scheduleJob('1 * * * * *', async () => {
        console.log("user schedule")
        await update_session()
    })
    // console.log({job})
}

module.exports = {
    update_session_schedule
}
