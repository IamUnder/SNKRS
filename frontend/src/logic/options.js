// Importacion de modulos
import axios from "axios"
//import cookies from "js-cookie"

const ENDPOINT_PATH = "http://localhost:3000"+"/api/"; // .env

// function setUser (user) {
//     cookies.set("userLogged", JSON.stringify(user))
// }

function updateProfile (options, token) {

    const headers = {
        'Content-Type': 'multipart/form-data',
        'auth-token': token
    }

    console.log(headers);
    return axios.post(ENDPOINT_PATH+'u/profile',options,{
        headers: headers
    }).then(response => {
        console.log(response.data);
        // setUser(response.data.user)
    })
}


export default {updateProfile}