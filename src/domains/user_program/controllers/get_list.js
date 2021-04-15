const user_program = require('../services/user_program')

module.exports = async (req, res) => {
    try{
        const result = await user_program.get_list()
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(448).send({message: error})
    }
}