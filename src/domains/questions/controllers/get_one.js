const question = require('../services/question')

module.exports = async (req, res) => {
    try{
        const {id} = req.params
        const result = await question.get_one(id)
        
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(413).send({message: error})
    }
}