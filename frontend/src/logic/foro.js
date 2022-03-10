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
function getPost (id) {

    return axios.get(ENDPOINT_PATH+'f/get/'+id)
}

// Funcion para dar follow a un usuario 
function follow (id, token) {

    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    return axios.post(ENDPOINT_PATH+'f/follow',id,{
        headers: headers
    })
}

// Funcion para dar unfollow a un usuario 
function unfollow (id, token) {

    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    return axios.post(ENDPOINT_PATH+'f/unfollow',id,{
        headers: headers
    })
}

export default {
    createPost,
    getAllPost, 
    getPost,
    follow,
    unfollow
}