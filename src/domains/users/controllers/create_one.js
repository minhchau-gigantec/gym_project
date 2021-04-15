const user_profile = require('../services/user_profile')

module.exports = async (req, res) => {
    try{
        const item = req.body
        const result = await user_profile.create_one(item)
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })

    }catch(error){
        console.log(error)
        res.status(451).send({message: error})
    }
}