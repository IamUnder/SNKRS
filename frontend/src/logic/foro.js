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

// Funcion para crear la respuesta
function reply (body, token) {

    const headers = {
        'Content-Type': 'multipart/form-data',
        'auth-token': token
    }

    return axios.post(ENDPOINT_PATH+'f/reply',body,{
        headers: headers
    })
}

function fav (id, token) {
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }
    const body = {
        id: id
    }

    return axios.post(ENDPOINT_PATH+'f/fav',body,{
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

function getAll (token) {
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    return axios.get(ENDPOINT_PATH+'f/getAll',{
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

// Funcion para recuperar un post en concreto
function getOnePost (id) {
    return axios.post(ENDPOINT_PATH+'f/getPost/'+id)
}

export default {
    createPost,
    getAllPost, 
    getPost,
    follow,
    unfollow,
    getOnePost,
    reply,
    fav,
    getAll
}