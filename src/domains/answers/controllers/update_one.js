const answer = require('../services/answer')

module.exports = async (req, res) => {
    try{
        const {id} = req.params
        const item = req.body

        const result = await answer.update_one(id, item)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(453).send({message: error})
    }
}