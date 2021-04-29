const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { env, setConfig } = require('./configs/config.service')
const mongo = require('./core/mongo')
const user_chedule = require('./domains/users/services/user_schedule')
const booking_schedule = require('./domains/booking/services/booking_schedule')
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

const airtable_router = require('./domains/airtable/router')

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

    app.use('/airtable', airtable_router)
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))



    app.use('/questions', check_auth, question_router)
    app.use('/answers',check_auth,  answer_router)
    app.use('/bookings',check_auth,  booking_router)
    
    app.use('/programs',check_auth,  program_router)
    app.use('/trackers',check_auth,  tracker_router)
    app.use('/users',check_auth,  user_router)

    app.use('/training_matrix',check_auth,  training_matrix_router)
    app.use('/training_programs',check_auth,  training_program_router)
    app.use('/training_matrix',check_auth,  training_matrix_router)
    app.use('/user_trainings',check_auth,  user_training_router)


    user_chedule.update_session_schedule()
    booking_schedule.update_booking()

    const { PORT, HOST } = env.config
    app.listen(PORT, () => {
        console.log(`SERVER: listen on ${HOST}:${PORT}`)
    })
}

start()