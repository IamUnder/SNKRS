const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 1,
            max: 255
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        user: {
            type: String,
            required: true,
            min:1,
            max: 255
        },
        img: {
            type: String,
            required: false
        },
        descripcion: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        }
    },{
        versionKey: false
    })

module.exports = mongoose.model('User', userSchema)