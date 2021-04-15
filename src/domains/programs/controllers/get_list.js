const program = require('../services/program')

module.exports = (req, res) => {
    try{
        const result = await program.get_list()
        return res.json({
            code: 200,
            message: 'handler success',
            data: result
        })
    }catch(error){
        console.log(error)
        return res.status(424).send({message: error})
    }
}