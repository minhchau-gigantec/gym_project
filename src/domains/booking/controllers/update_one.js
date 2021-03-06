const booking = require('../services/booking')

module.exports = async (req, res) => {
    try{
        const {id} = req.params
        const booking_model = req.body
        const {user} = req
        const user_id = user._id

        const result = await booking.update_one(user_id, id, booking_model)
        return res.json({code: 200, message: 'handler success', data: result})
    }catch(error){
        console.log(error)
        return res.status(427).send({message: error})
    }
}