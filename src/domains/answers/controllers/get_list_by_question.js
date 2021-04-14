const answer = require('../services/answer')

module.exports = async (req, res) => {
    try{
        const {question_id} = req.params
        const result = await answer.get_list_by_question(question_id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(421).send({message: error})
    }
}