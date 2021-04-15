const user_program = require('../services/user_program')

module.exports = async(req, res) => {
    try{
        const item = req.body
        const result = await user_program.create_one(item)
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