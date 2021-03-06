const tracker = require('../services/tracker')

module.exports = async(req, res) => {
    try {
        const item = req.body
        const {user} = req
        const {id} = req.params
        const user_id = user._id
        const result = await tracker.update_one(user_id, id, item)
        return res.json({
            code: 200,
            message: 'Handler success',
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(442).send({ message: error })
    }
}