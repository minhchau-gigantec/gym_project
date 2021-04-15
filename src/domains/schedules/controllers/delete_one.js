const schedule = require('../services/schedule')

module.exports = async(req, res) => {
    try {
        const { id } = req.params
        const {user} = req
        const user_id = user._id
        const result = await schedule.delete_one(user_id, id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(436).send({ message: error })
    }
}