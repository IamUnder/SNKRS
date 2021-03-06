// Declaracion de modulos
const router = require('express').Router()
const User = require('../models/users')
const multer  = require('multer')
const upload = multer()
const firebase = require('../config/firebase')
const { v4 } = require('uuid');

// Ruta de testing
router.post('/s', (req, res) => {
    res.json({
        error: null,
        data: 'test'
    })
})

// Ruta de edicion de perfil
router.post('/profile', upload.single('file'), async (req, res) => {

    var url = ''

    if (req.file) { // El usuario a subido su nuevo icono

        const token = v4();
        // Grab the file
        const file = req.file;
        // Format the filename
        const timestamp = Date.now();
        const name = req.user.id;
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${type}`;
        const blob = firebase.bucket.file(fileName)
        
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: token,
                }
            }
        })

        blobWriter.end(req.file.buffer)
        
        url = 'https://firebasestorage.googleapis.com/v0/b/snkrs-c87de.appspot.com/o/' + fileName + "?alt=media&token=" + token

    }

    var user = await User.findByIdAndUpdate({_id: req.user.id},{
        name: req.body.name, 
        descripcion: req.body.descripcion,
        name: req.body.name,
        img: url
    })
    
    user = await User.findById(req.user.id)

    return res.json({
        error: null,
        user: {
            user: user.user,
            name: user.name,
            img: user.img,
            email: user.email,
            descripcion: user.descripcion,
            id: user._id,
            follow: user.follow,
            followers: user.followers,
            token: req.header('auth-token')
        }
    })
})

module.exports = router