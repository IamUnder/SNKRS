

function login (req, res) {
    
    res.status(200).send({
        menssage: "login correcto"
    })

}

function register (req, res) {

    res.status(200).send({
        menssage: "registro"
    })

}

// Exportación de modulos
module.exports = {
    login,
    register
}