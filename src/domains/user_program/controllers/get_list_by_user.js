const user_program = require('../services/user_program')


module.exports = async (req, res) => {
    try{
        const {user_id} = req.params
        const result = await user_program.get_list_by_user(user_id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(447).send({message: error})
    }
}