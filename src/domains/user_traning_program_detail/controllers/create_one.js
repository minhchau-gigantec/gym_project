const user_traning = require('../services/user_training')

module.exports = async (req, res) => {
    try{
        const item = req.body
        const result  = await user_traning.create_one(user_id, item)

        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(466).send({message: error})
    }
}