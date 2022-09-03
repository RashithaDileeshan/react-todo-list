const mongoose = require('mongoose')

// create schema
const TodoItemSchema = new mongoose.Schema({
    item:{
        type: String,
        require: true
    }
})

// export this schema
module.exports = mongoose.model('todo', TodoItemSchema)