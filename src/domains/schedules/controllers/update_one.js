const schedule = require('../services/schedule')

module.exports = async(req, res) => {
    try {
        const { id } = req.params
        const item = req.body
        const {user} = req
        const user_id = user._id

        const result = await schedule.update_one(user_id, id, item)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })
    } catch (error) {
        console.log(error)
        return res.status(458).send({ message: error })
    }
}