const schedule = require('node-schedule')
const { env } = require('../../../configs/config.service')
const axios = require('axios')
const booking = require('./booking')


const update_one = () => new Promise(async(resolve, reject) => {
    try {
        const { AIR_BOOKING_URL, AIR_TOKEN } = env.config

        const response = await axios.get(AIR_BOOKING_URL, {
            headers: {
                Authorization: "Bearer " + AIR_TOKEN
            }
        })

        if (response.status != 200) {
            console.log("update booking schedule failure")
            return resolve("update booking schedule failure")
        }

        const session_list = response.data.records
        update_sessions = session_list.map(async(item) => {
            const { _id, complete, checked_at, note, time } = item.fields

            // console.log({_id, complete, checked_at})
            return booking.update_schedule(_id, {
                complete: complete || false,
                checked_at: checked_at || new Date().toISOString(),
                note,
                time

            })
        })

        await Promise.all(update_sessions)
        return resolve('update booking success')

    } catch (error) {
        console.log(error)
        return resolve("update booking failure")
    }
})

update_booking = async() => {
    // const job = schedule.scheduleJob('1 * * * * *', async () => {
    await update_one()
        // })
}

module.exports = {
    update_booking
}