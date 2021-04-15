const booking = require('../services/booking')

module.exports = async (req, res) => {
    try{
        const {user} = req
        const user_id = user._id
        const result = await booking.get_list_by_user(user_id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(428).send({message: error})
    }
}