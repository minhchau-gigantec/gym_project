const tracker = require('../services/tracker')

module.exports = (req, res) => {
    try{
        const item = req.body
        const result = await tracker.update_one(item)
        return res.json({
            code: 200,
            message: 'Handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(442).send({message: error})
    }
}