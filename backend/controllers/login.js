

function test (req, res) {
    
    res.status(200).send({
        menssage: "servidor correcto"
    })

}

// Exportación de modulos
module.exports = {
    test
}