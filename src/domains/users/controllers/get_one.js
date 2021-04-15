const user_profile = require('../services/user_profile')

module.exports = async(req, res) => {
    try {
        const { user } = req
        return res.json({
            code: 200,
            message: 'handler success',
            data: user
        })

    } catch (error) {
        console.log(error)
        return res.status(452).send({ massage: error })
    }
}