const user_program = require('../services/user_program')


module.exports = async (req, res) => {
    try{
        const {user} = req
        const user_id = user._id
        const result = await user_program.get_one(user_id)

        return res.json({
            code: 200,
            message: "handler success",
            data: result
        })
    }catch(error){
        console.log(error)
        return res.status(449).send({message: error})
    }
}