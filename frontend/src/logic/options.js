// Importacion de modulos
import axios from "axios"
import cookies from "js-cookie"

const ENDPOINT_PATH = "http://localhost:3000"+"/api/"; // .env

function setUser (user) {
    cookies.set("userLogged", JSON.stringify(user))
}

function updateProfile (options, token) {

    const headers = {
        'Content-Type': 'application/json',
        'auth-token': token
    }

    return axios.post(ENDPOINT_PATH+'u/profile',options,{
        headers: headers
    }).then(response => {
        setUser(response.data.user)
        console.log('hago esto');
    })
}


export default {updateProfile}