const user_training = require('../services/user_training')

module.exports = async (req, res) => {
    try{
        const {user} = req
        const user_id = user._id
        const {training_detail_id} = req.params
        const result = await user_training.get_one_by_user(user_id, training_detail_id)

        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(470).send({message: error})
    }
}