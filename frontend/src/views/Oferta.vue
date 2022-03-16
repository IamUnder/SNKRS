<template lang="html">
    <div>

        <!-- Navbar -->
        <navbar/>
        
        <!-- Contenido -->
        <div class="main">
            <div class="container">
                <!-- Lanzamientos nike -->
                <div class="row mb-3">
                    <div class="container mt-5">
                        <h3><font-awesome-icon icon="fa-solid fa-angles-right" /> Proximos lanzamintos Adidas</h3>
                        <div class="table-responsive">
                            <table class="table text-white table-hover custom-table">
                                <thead>
                                    <tr>
                                        <th colspan="2">Modelo</th>
                                        <th>Tipo</th>
                                        <th>Precio</th> 
                                        <th>Imagen</th>
                                        <th>Opinion popular</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-for="ni in nike" :key="ni._id" class="align-items-center">
                                    <tr>
                                        <td colspan="2" class="align-middle">
                                            <h6>{{ni.modelo}}</h6>
                                        </td>
                                        <td class="align-middle">
                                            {{ni.tipo}}
                                        </td>
                                        <td class="align-middle">
                                            {{ni.precioDescuento}} <strike>{{ni.precio}}</strike>
                                        </td>
                                        <td class="align-middle">
                                            <div class="d-flex align-items-center"><img class="rounded-circle" :src="ni.img" width="60"></div>
                                        </td>
                                        <td class="align-middle">
                                            <i @click="fav(ni._id)" class="mdi mdi-thumb-up mr-2">{{ni.like.length}}</i>
                                            <i @click="fav(ni._id)" class="mdi mdi-thumb-up-outline mr-2">{{ni.like.length}}</i>

                                            <i @click="fav(ni._id)" class="mdi mdi-thumb-down">{{ni.dislike.length}}</i>
                                            <i @click="fav(ni._id)" class="mdi mdi-thumb-down-outline">{{ni.dislike.length}}</i>
                                        </td>
                                        <td class="align-middle"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" @click="goTo(ni.url)"/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- Lanzamientos adidas -->
                <div class="row mb-3">
                    <div class="container mt-5">
                        <h3><font-awesome-icon icon="fa-solid fa-angles-right" /> Proximos lanzamintos Adidas</h3>
                        <div class="table-responsive">
                            <table class="table text-white table-hover custom-table">
                                <thead>
                                    <tr>
                                        <th colspan="2">Modelo</th>
                                        <th>Tipo</th>
                                        <th>Precio</th> 
                                        <th>Imagen</th>
                                        <th>Opinion popular</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-for="ad in adidas" :key="ad._id" class="align-items-center">
                                    <tr>
                                        <td colspan="2" class="align-middle">
                                            <h6>{{ad.modelo}}</h6>
                                        </td>
                                        <td class="align-middle">
                                            {{ad.tipo}}
                                        </td>
                                        <td class="align-middle">
                                            {{ad.precioDescuento}} <strike>{{ad.precio}}</strike>
                                        </td>
                                        <td class="align-middle">
                                            <div class="d-flex align-items-center"><img class="rounded-circle" :src="ad.img" width="60"></div>
                                        </td>
                                        <td class="align-middle">
                                            <i @click="fav(ad._id)" class="mdi mdi-thumb-up mr-2">{{ad.like.length}}</i>
                                            <i @click="fav(ad._id)" class="mdi mdi-thumb-up-outline mr-2">{{ad.like.length}}</i>

                                            <i @click="fav(ad._id)" class="mdi mdi-thumb-down">{{ad.dislike.length}}</i>
                                            <i @click="fav(ad._id)" class="mdi mdi-thumb-down-outline">{{ad.dislike.length}}</i>
                                        </td>
                                        <td class="align-middle"><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" @click="goTo(ad.url)"/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    </div>
</template>

<script>
// Importacion de componentes
import navbar from "@/components/navbar.vue"
import oferta from "@/logic/oferta.js"
import auth from "@/logic/auth.js"

export default {
    components: {
        navbar
    },
    data: () => ({
        nike: [],
        adidas: [],
        token: '',
        id: ''
    }),
    methods: {
        getOfertas () {
            oferta.getOfertas().then(response => {
                this.nike = response.data.nike
                this.adidas = response.data.adidas
            })
        },
        fav (id) {
            console.log(id)
            console.log(this.token);
        },
        unfav (id) {
            console.log(id)
        }, 
        goTo (url) {
            console.log(url);
            var win = window.open(url, '_blank');
            // Cambiar el foco al nuevo tab (punto opcional)
            win.focus();
        }
    },
    mounted() {
        this.getOfertas()
        this.token = auth.getUser().token
        this.id = auth.getUser().id
    },
}
</script>

<style lang="css" scoped>
    
    .main {
        margin-top: 5%;
        margin-left: 5%;
    }

    .custom-table {
        background-color: #FCBF49;
        color: #003049;
    }

</style>