const schedule = require('../services/schedule')

module.exports = (req, res) => {
    try{
        const {id} = req.params

        const result = await schedule.get_one(id)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(438).send({message: error})
    }
}