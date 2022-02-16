const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    idUser : {
        type: String,
        required: true
    },
    nameUser :{
        type: String,
        requiered: true
    },
    user: {
        type: String,
        required: true
    },
    body : {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    parent: {
        type: String,
        required: false,
        default: ''
    },
    reply: {
        type: Array,
        default: []
    }
},{
    versionKey: false
})

module.exports = mongoose.model('Post', postSchema)