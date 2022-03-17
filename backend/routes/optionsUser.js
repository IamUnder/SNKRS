// Declaracion de modulos
const router = require('express').Router()
const User = require('../models/users')
const multer  = require('multer')
const upload = multer()
const firebase = require('../config/firebase')
const { uuid } = require('uuidv4');

// Ruta de testing
router.post('/s', (req, res) => {
    res.json({
        error: null,
        data: 'test'
    })
})

// Ruta de edicion de perfil
router.post('/profile', upload.single('file'), async (req, res) => {

    var file = ''

    if (req.file) { // El usuario a subido su nuevo icono

        const token = uuid();
        console.log(token);
        const blob = firebase.bucket.file(req.file.originalname)
        
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: token,
                }
            }
        })

        blobWriter.end(req.file.buffer)
        
        var url = 'https://firebasestorage.googleapis.com/v0/b/snkrs-c87de.appspot.com/o/' + req.file.originalname + "?alt=media&token=" + token

        console.log(url);


        } else {
            console.log('no hay file')
        }
            


    return res.json({
        error: null,
        body: req.body,
        file: req.file
    })

    // var user = await User.findByIdAndUpdate({_id: req.user.id},{
    //     name: req.body.name, 
    //     descripcion: req.body.descripcion,
    //     name: req.body.name      
    // })
    
    // user = await User.findById(req.user.id)

    // return res.json({
    //     error: null,
    //     user: {
    //         user: user.user,
    //         name: user.name,
    //         img: user.img,
    //         email: user.email,
    //         descripcion: user.descripcion,
    //         id: user._id,
    //         follow: user.follow,
    //         followers: user.followers,
    //         token: req.header('auth-token')
    //     }
    // })
})

module.exports = router