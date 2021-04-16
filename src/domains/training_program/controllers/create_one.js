const traning_program  = require('../services/training_program')

module.exports = async (req, res) => {
    try{
        const item_model = req.body
        const result = await traning_program.create_one(item_model)

        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })
    }catch(error){
        console.log(error)
        return res.status(460).send({message: error})
    }
}