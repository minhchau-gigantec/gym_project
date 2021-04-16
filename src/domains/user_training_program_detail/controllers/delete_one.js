const user_training = require('../services/user_training')

module.exports = async(req, res) => {
    try {
        const { id } = req.params
        const { user } = req
        const user_id = user._id
        const result = await user_training.delete_one(user_id, id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(467).send({ message: error })
    }
}