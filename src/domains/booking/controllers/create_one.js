const booking = require('../services/booking')

module.exports = async (req, res) => {
    try{
        const booking_model = req.body
        const result = await booking.create_one(booking_model)
        return resolve(result)

    }catch(error){
        console.log(error)
        return res.send(426).send({message: error})
    }
}