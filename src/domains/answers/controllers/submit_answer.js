const submit_answers = require('../services/submit_answers')
const user_profile = require('../../users/services/user_profile')

module.exports = async (req, res) => {
    try{
        const answer_ids = req.body
        const format_programs = await submit_answers(answer_ids)

        const {user} = req
        const user_id = user._id
        await  user_profile.update_one(user_id, {is_answered: true})
        return res.json({
            code: 200,
            message: 'handler success',
            data:  format_programs
        })

    }catch(error){
        console.log(error)
        return res.status(473).send({message: error})
    }
}