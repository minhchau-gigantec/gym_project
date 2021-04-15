const tracker = require('../services/tracker')

module.exports = async (req, res) => {
    try{
        const item = req.body
        const result = await tracker.create_one(item)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(437).send({message: error})
    }
}