const user_training = require('../services/user_training')

module.exports = (req, res) => {
    try{
        const {user} = req
        const user_id = user._id
        const {id} = req.params
        const item = req.body
        const result = await user_training.update_one(user_id, id, item)
        
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })
    }catch(error){
        console.log(error)
        return res.status(471).send({message: error})
    }
}