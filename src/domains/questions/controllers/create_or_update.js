const question = require('../services/question')

module.exports = async (req, res) => {
    try{
        const question_model = req.body
        const result = await question.create_or_update(question_model)
        return res.send({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(410).send({message: error})
    }
}