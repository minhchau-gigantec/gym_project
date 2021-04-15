const answer = require('../services/answer')

module.exports = async (req, res) => {
    try{
        const answer_model = req.body
        const result = await answer.create_one(answer_model)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(409).send({message: error})
    }
}