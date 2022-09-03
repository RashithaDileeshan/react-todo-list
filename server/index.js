const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express();
const cors =require('cors')
//use express.json() to get data into json format
app.use(express.json())

//port
const PORT = process.env.PORT || 5500

app.listen(PORT, () => console.log("Server Connected"))

// use cors
app.use(cors())
//import routes
const todoItemRoute = require('./routes/todoItems');

// connect database
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err))

app.use('/', todoItemRoute)

