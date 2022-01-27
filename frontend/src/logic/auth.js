import axios from "axios"

const ENDPOINT_PATH = "http://localhost:3000"+"/api/";

function login (user, password) {
    const userlogin = {user, password}
    return axios.post(ENDPOINT_PATH+'login', userlogin)
}

export default { login };