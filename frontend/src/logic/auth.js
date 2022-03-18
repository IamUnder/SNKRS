// Importacion de moduloes
import axios from "axios"
import cookies from "js-cookie"

const ENDPOINT_PATH = "http://localhost:3000"+"/api/"; // .env

// Funcion de login
function login (user, password) {
    const userlogin = {user, password}
    return axios.post(ENDPOINT_PATH+'login', userlogin)
}

// Funcion de registro
function register (name, email, password, user) {
    const userRegister = {name, email, password, user}
    return axios.post(ENDPOINT_PATH+'register', userRegister)
}

// Funcion setteo user en cookies
function setUser (user) {
    cookies.set("userLogged", JSON.stringify(user))
}

// Funcion get user en cookies
function getUser () {
    var user = cookies.get("userLogged")
    if (user) {
        return JSON.parse(user)
    }

    return ''
}

// Funcion para hacer logout
function logOut () {
    cookies.remove("userLogged")
}

// Funcion para recoger un usuario especifico
function getOneUser (userData) {
    const user = {
        user: userData
    }
    console.log(user);
    return axios.post(ENDPOINT_PATH+'/user',user)
}

// Funcion para el middleware
function validate (token) {
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    return axios.post(ENDPOINT_PATH+'validate',{}, {
        headers: headers
    })
}

export default { login, register, setUser, getUser, logOut, getOneUser, validate };