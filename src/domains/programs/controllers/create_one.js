const program = require('../services/program')

module.exports = async(req, res) => {
    try {
        const program_model = req.body

<<<<<<< HEAD:src/domains/programs/controllers/create_or_update.js
        const result = await program.create_or_update(program_model)
        return res.json({ code: 200, message: 'handler success', data: result })
=======
        const result = await program.create_one(program_model)
        return res.json({code: 200, message: 'handler success', data: result})
>>>>>>> c269e58743e683297ecc8aabd4bccbf8edc81888:src/domains/programs/controllers/create_one.js

    } catch (error) {
        console.log(error)
        return res.status(422).send({ message: error })
    }
}