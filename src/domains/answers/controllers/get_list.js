const answer = require('../services/answer')

module.exports = async (req, res) => {
    try{
        const result = await answer.get_list()
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(422).send({message: error})
    }
}