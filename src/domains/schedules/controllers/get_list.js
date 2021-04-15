const schedule = require('../services/schedule')

module.exports = async(req, res) => {
    try {
        const result = await schedule.get_list()
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    } catch (error) {
        console.log(error)
        return res.status(437).send({ message: error })
    }
}