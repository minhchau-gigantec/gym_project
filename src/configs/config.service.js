const dotenv = require('dotenv')
const fs = require('fs')


const env = {
    config: null
}

const setConfig = () => {
    var configFilePath = '.local.env'


    if(process.env.NODE_ENV && process.env.NODE_ENV === 'production'){
        configFilePath = '.production.env'
    }

    if(process.env.NODE_ENV && process.env.NODE_ENV === 'development'){
        configFilePath = '.development.env'
    }

    const config = dotenv.parse(fs.readFileSync(configFilePath))

    config.NODE_ENV = process.env.NODE_ENV || 'local'

    env.config = config
    return config
}

module.exports = {
    env,
    setConfig
}