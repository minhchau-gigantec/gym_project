const traning_matrix = require('../services/training_matrix')

module.exports = async (req, res) => {
    try{
        const item = req.body
        const result = await traning_matrix.create_one(item)
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