const tracker = require('../services/tracker')

module.exports = async(req, res) => {
    try {
        const { id } = req.params
        const result = await tracker.delete_one(id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })
    } catch (error) {
        console.log(error)
        return res.status(439).send({ message: error })
    }
}