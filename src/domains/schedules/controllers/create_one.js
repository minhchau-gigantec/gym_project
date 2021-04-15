const schedule = require('../services/schedule')

module.exports = async (req, res) => {
    try{
        const schedule_model = req.body
        const {user} = req
        const result = await schedule.create_one(user.id, schedule_model)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        return res.status(434).send({message: error})
    }
}