const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port || 5000

//connectDB()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)





app.listen(port, () => console.log(`Server Started On Port ${port}...`.green.bold))
app.get('/' , require('./routes/adminRoutes'))
app.use('/Admin' , require('./routes/adminRoutes'))
app.use('/Admin' , require('./routes/adminRoutes'))
//localhost:5000/
//localhost:5000/addpharma
