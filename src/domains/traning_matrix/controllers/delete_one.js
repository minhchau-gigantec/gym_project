const traning_matrix = require('../services/training_matrix')

module.exports = async (req, res) => {
    try{
        const {id} = req.params
        
        const result = await traning_matrix.delete_one(id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(464).send({message: error})
    }
}