// Importacion de moduloes
import axios from "axios"
import cookies from "js-cookie"

const ENDPOINT_PATH = "http://localhost:3000"+"/api/";

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
    cookies.set("userLogged", user)
}

// Funcion get user en cookies
function getUser () {
    return cookies.get("userLogged")
}

function deleteUser () {
    cookies.remove("userLogged")
}

export default { login, register, setUser, getUser, deleteUser };