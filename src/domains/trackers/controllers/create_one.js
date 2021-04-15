const tracker = require('../services/tracker')

module.exports = async (req, res) => {
    try{
        const {user} = req
        const user_id = user._id
        const item = req.body
        const result = await tracker.create_one(user_id, item)
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