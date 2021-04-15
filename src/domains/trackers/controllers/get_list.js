const tracker = require('../services/tracker')

module.exports = async(req, res) => {
    try {
        const result = await tracker.get_list()
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(441).send({ message: error })
    }
}