const training_matrix = require('../services/training_matrix')

module.exports = async (req, res) => {
    try{
        const {program_id} = req.params
        const result = await training_matrix.get_one_by_program(program_id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(462).send({message: error})
    }
}