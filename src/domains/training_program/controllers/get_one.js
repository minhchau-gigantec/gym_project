const training_program = require('../services/training_program')


module.exports = async (req, res) => {
    try{
        const {id} = req.params
        const result = await training_program.get_list(id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(461).send({message: error})
    }
}