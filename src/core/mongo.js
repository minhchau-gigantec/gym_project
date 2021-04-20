const MongoClient = require('mongodb').MongoClient;
const { env } = require('../configs/config.service')

const mongo = {
    db: null,
    connect: null,
}

mongo.connect = async() => {
    try {
        const { DB_URL, DB_DATABASE } = env.config
            // Database Name
        const client = new MongoClient(DB_URL, ({ useNewUrlParser: true, useUnifiedTopology: true }))

        // Use connect method to connect to the server 
        await client.connect()
        mongo.db = client.db(DB_DATABASE)

        console.log(`MONGO DATABASE: connect success: ${DB_URL}/${DB_DATABASE}`)

    } catch (error) {
        console.log(error)
        throw error
    }
}


module.exports = mongo