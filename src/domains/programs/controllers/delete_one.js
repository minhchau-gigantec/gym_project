const program = require('../services/program')

module.exports = async(req, res) => {
    try {
        const { id } = req.params
        const result = await program.delete_one(id)
        return res.json({ code: 200, message: 'handler success', data: result })

    } catch (error) {
        console.log(error)
        return res.status(423).send({ message: error })
    }
}