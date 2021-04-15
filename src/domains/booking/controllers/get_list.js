const booking = require('../services/booking')

module.exports = async(req, res) => {
    try {
        const result = await booking.get_list()
        return res.json({ code: 200, message: 'handler success', data: result })

    } catch (error) {
        console.log(error)
        return res.status(431).send({ message: error })
    }
}