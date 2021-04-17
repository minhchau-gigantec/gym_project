const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { env, setConfig } = require('./configs/config.service')
const mongo = require('./core/mongo')

const check_auth = require('./middleware/check_auth')


const question_router = require('./domains/questions/router')
const answer_router = require('./domains/answers/router')
const booking_router = require('./domains/booking/router')

const program_router = require('./domains/programs/router')
const tracker_router = require('./domains/trackers/router')
const user_router = require('./domains/users/router')

const training_matrix_router = require('./domains/traning_matrix/router')
const training_program_router = require('./domains/training_program/router')
const user_training_router = require('./domains/user_training_program_detail/router')


const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const start = async() => {
    //config
    setConfig()
    console.log(`ENVIRONMENT: ${env.config.NODE_ENV}`)

    // test connect mongodb
    await mongo.connect()

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    app.use(check_auth)


    app.use('/questions', question_router)
    app.use('/answers', answer_router)
    app.use('/bookings', booking_router)
    
    app.use('/programs', program_router)
    app.use('/trackers', tracker_router)
    app.use('/users', user_router)

    app.use('/training_matrix', training_matrix_router)
    app.use('/training_programs', training_program_router)
    app.use('/training_matrix', training_matrix_router)
    app.use('/user_trainings', user_training_router)


    const { PORT, HOST } = env.config
    app.listen(PORT, () => {
        console.log(`SERVER: listen on ${HOST}:${PORT}`)
    })
}

start()