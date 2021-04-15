const question = require('../services/question')

module.exports = async (req, res) => {
    try{
        const {id} = req.params
        const item = req.body

        const result = await question.update_one(id, item)
        return res.json({
            code: 200,
            message: 'Handler success',
            data: result
        })
        
    }catch(error){
        console.log(error)
        return res.status(412).send({message: error})
    }
}