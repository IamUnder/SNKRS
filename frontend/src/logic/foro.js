// Importacion de modulos
import axios from "axios"

const ENDPOINT_PATH = "http://localhost:3000"+"/api/"; // .env

// Funcion para crear post
function createPost (post, token) {
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    return axios.post(ENDPOINT_PATH+'f/create',post,{
        headers: headers
    })
}

// Funcion para recuperar todos los post
function getAllPost (token) {
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    return axios.get(ENDPOINT_PATH+'f/get',{
        headers: headers
    })
}

// Funcion para recuperar los post de un usuario
function getPost (id, token) {
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    return axios.get(ENDPOINT_PATH+'f/get/'+id,{
        headers: headers
    })
}

export default {
    createPost,
    getAllPost, 
    getPost
}