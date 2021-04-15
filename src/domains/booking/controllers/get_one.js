const booking = require('../services/booking')

module.exports = async (req, res) => {
    try{
        const {id} = req.params
        
        const result = await booking.get_one(id)
        return res.json({code: 200, message: 'handler success', data: result})

    }catch(error){
        console.log(error)
        return res.status(430).send({message: error})
    }
}