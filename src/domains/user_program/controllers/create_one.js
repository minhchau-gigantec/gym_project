const user_program = require('../services/user_program')

module.exports = async (req, res) => {
    try{
        const item = req.body
        const {user} = req
        const user_id = user._id
        const result = await user_program.create_one(user_id, item)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(445).send({message: error})
    }
}