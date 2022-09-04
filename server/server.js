const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

const connectDb = require('./db/connection')

const app = express()
connectDb()

const PORT = process.env.APP_PORT || 8080
const APP_ENV = process.env.APP_ENV || "production"


if (APP_ENV == "dev") {
    app.use(morgan('dev'))
}
else {
    app.use(morgan('combined'))
}

app.use(express.json())


app.listen(PORT, () => {
    console.log(`server is up and listening.
     PORT : ${PORT} 
     APP_ENV : ${APP_ENV} 
    `)
})