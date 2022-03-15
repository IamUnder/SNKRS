const mongoose = require('mongoose')

const releaseSchema = mongoose.Schema(
    {
        week: {
            type: Number,
            required: true,
        },
        nike: {
            type: Array,
            required: true,
        },
        adidas: {
            type: Array,
            required: false,
        },
        date: {
            type: Date,
            default: Date.now
        }
    },{
        versionKey: false
    })

module.exports = mongoose.model('release', releaseSchema)