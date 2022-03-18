const admin = require('firebase-admin')
const serviceAccount = require("../config/firebase.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASEBUCKET
})

const bucket = admin.storage().bucket()

module.exports = {
    bucket
}