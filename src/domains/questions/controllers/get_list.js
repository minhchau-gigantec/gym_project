const question = require('../services/question')

module.exports = async (req, res) => {
    try{
        const result = await question.get_list()
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(412).send({message: error})
    }
}