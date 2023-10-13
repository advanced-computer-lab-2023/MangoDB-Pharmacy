const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port =5000
// const port = process.env.port || 3000

connectDB()


const app = express()
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }));


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)


app.listen(port, () => console.log(`Server Started On Port ${port}...`.green.bold))
// app.get('/' , require('./routes/adminRoutes'))
app.use('/Admin' , require('./routes/adminRoutes'))
app.use('/Pharmacist' , require('./routes/pharmacistRoutes'))
app.use('/Guest' , require('./routes/guestRoutes'))
app.use('/Patient', require('./routes/patientRoutes'))

//localhost:5000/
//localhost:5000/addpharma
