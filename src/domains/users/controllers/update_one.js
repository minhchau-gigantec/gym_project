const user_profile = require('../services/user_profile')

module.exports = async(req, res) => {
    try {
        const item = req.body
        const { user } = req
        const result = await user_profile.update_one(user._id, item)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(450).send({ message: error })
    }
}