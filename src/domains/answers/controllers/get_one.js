const answer = require('../services/answer')

module.exports = async (req, res) => {
    try{

        const {id} = req.params
        const result = await answer.get_one(id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })
    }catch(error){
        console.log(error)
        return res.status(405).send({message: error})
    }
}