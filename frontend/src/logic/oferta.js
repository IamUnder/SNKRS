// Importacion de modulos
import axios from 'axios'

const ENDPOINT_PATH = "http://localhost:3000"+"/api/"; // .env

// Funcion para obtener los proximos lanzamientos
function getOfertas() {

    return axios.get(ENDPOINT_PATH+'s/outlet')
}

// Funcion para dar like a una oferta
function fav (id, token) {

    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    const body = {
        id: id
    }

    return axios.post(ENDPOINT_PATH+'s/like',body,{
        headers: headers
    })
}

// Funcion para quitar fav
function unfav (id, token) {

    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    const body = {
        id: id
    }

    return axios.post(ENDPOINT_PATH+'s/dislike',body,{
        headers: headers
    })
}

export default {
    getOfertas,
    fav,
    unfav
}