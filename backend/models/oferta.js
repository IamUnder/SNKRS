const mongoose = require('mongoose')

const ofertaSchema = mongoose.Schema(
    {
        week: {
            type: Number,
            required: true,
        },
        marca: {
            type: String,
            requiered: true
        },
        modelo: {
            type: String,
            required: true,
        },
        tipo: {
            type: String,
            required: true
        },
        precio: {
            type: String,
            required: true,
        },
        precioDescuento: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        like: {
            type: Array,
            default: []
        },
        dislike: {
            type: Array,
            default: []
        }
    },{
        versionKey: false
    })

module.exports = mongoose.model('oferta', ofertaSchema)