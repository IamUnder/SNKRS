// Importacion de modulos
import axios from 'axios'

const ENDPOINT_PATH = "http://localhost:3000"+"/api/"; // .env

// Funcion para obtener los proximos lanzamientos
function getRelease() {

    return axios.get(ENDPOINT_PATH+'s/release')
}

export default {
    getRelease
}