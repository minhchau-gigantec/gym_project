const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { env, setConfig } = require('./configs/config.service')
const mongo = require('./core/mongo')


const question_router = require('./domains/questions/router')
const answer_router = require('./domains/answers/router')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')


const start = async() => {

    //config
    setConfig()
    console.log(`ENVIRONMENT: ${env.config.NODE_ENV}`)

    // test send email
    await mongo.connect()

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))


    app.use('/questions', question_router)
    app.use('/answers', answer_router)

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    const { PORT, HOST } = env.config
    app.listen(PORT, () => {
        console.log(`SERVER: listen on ${HOST}:${PORT}`)
    })
}

start()