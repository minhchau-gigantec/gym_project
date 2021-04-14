const question = require('../services/question')

module.exports = async (req, res) => {
    try{
        const {id} = req.params
        const result = await question.delete_one(id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(411).send({message: error})
    }
}