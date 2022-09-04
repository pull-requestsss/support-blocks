const mongoose = require('mongoose')
require('dotenv').config()

const connectDb = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI
        )
        console.log(
            `mongodb connection successful with host ${conn.connection.host}`
        )

    }
    catch (e) {
        console.log(`mongodb connection failed with host`)
        process.exit()
    }
}

module.exports = connectDb