const tracker = require('../services/tracker')

module.exports = async(req, res) => {
    try {
        const { user} = req
        const user_id = user._id
        const result = await tracker.get_list_by_user(user_id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(440).send({ message: error })
    }
}