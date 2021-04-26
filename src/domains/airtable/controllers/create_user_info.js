const info = require('../services/info')

module.exports = async (req, res) => {
    try{
        const item = req.body

        const result = await info.create_user_info(item)
        return res.json({status: 200, message: 'handler success', data: result})
        
    }catch(error){
        return res.status(409).send({message: error})
    }
}