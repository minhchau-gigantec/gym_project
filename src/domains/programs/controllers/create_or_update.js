const program = require('../services/program')

module.exports = (req, res) => {
    try{
        const program_model = req.body

        const result = await program.create_or_update(program_model)
        return res.json({code: 200, message: 'handler success', data: result})

    }catch(error){
        console.log(error)
        return res.status(422).send({message: error})
    }
}