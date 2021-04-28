const answer = require('./answer')
const program = require('../../programs/services/program')

module.exports = (answer_ids) => new Promise(async(resolve, reject) => {
    try {
        const answer_list = await answer.get_list(answer_ids)
            // console.log(answer_list.question)

        //format_answer: [ { types: [Array: "1"], points: 1 } ]
        const format_answers = answer_list.map(row => {
                const answer_item = {
                    types: row.question.types,
                    points: row.points
                }
                return answer_item
            })
            // console.log({ format_answers })

        //program_list: ['object1 P1','object P2]
        const program_list = await program.get_list()
            // console.log({ program_list })

        const format_programs = program_list.map(row => {
                const program_item = {
                    _id: row._id,
                    name: row.name,
                    points: 0,
                    is_recommended: false
                }
                return program_item
            })
            // console.log({ format_programs })


        for (var i = 0; i < format_programs.length; i++) {
            for (var j = 0; j < format_answers.length; j++) {
                const type_list = format_answers[j].types
                    // console.log({ type_list })
                const type = format_programs[i].name
                    // console.log({ type })
                if (type_list.includes(type)) {
                    format_programs[i].points += format_answers[j].points
                }
            }
        }

        const max_item = format_programs.reduce((prev, current) => {
            return (prev.points > current.points) ? prev : current
        })

        max_item.is_recommended = true

        return resolve(format_programs)

    } catch (error) {
        console.log(error)
        return reject(error)
    }
})