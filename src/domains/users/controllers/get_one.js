const user_profile = require('../services/user_profile')

module.exports = async(req, res) => {
    try {
        const { id } = req.params
        const result = await user_profile.get_one(id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(452).send({ massage: error })
    }
}