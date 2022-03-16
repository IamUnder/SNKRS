<template lang="">
    <div>

        <!-- Navbar -->
        <navbar/>
        <!-- Contenido -->
        <div class="main">
            <div class="container">
                <!-- Lanzamientos nike -->
                <div class="row mb-3">
                    <div class="container mt-5">
                        <h3><font-awesome-icon icon="fa-solid fa-angles-right" /> Proximos lanzamintos Nike</h3>
                        <div class="table-responsive">
                            <table class="table text-white table-hover custom-table">
                                <thead>
                                    <tr>
                                        <th colspan="2">Silueta</th>
                                        <th>Modelo</th>
                                        <th>Imagen</th>
                                        <th>Lanzamiento</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-for="ni in nike" :key="ni.nombre" class="align-items-center">
                                    <tr>
                                        <td colspan="2" class="align-middle">
                                            <h6>{{ni.modelo}}</h6>
                                        </td>
                                        <td class="align-middle">
                                            <h6>{{ni.nombre}}</h6>
                                        </td>
                                        <td class="align-middle">
                                            <div class="d-flex align-items-center"><img class="rounded-circle" :src="ni.img" width="60"></div>
                                        </td>
                                        <td class="align-middle">{{ni.fecha}}</td>
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
                                        <th colspan="3">Modelo</th>
                                        <th>Imagen</th>
                                        <th>Lanzamiento</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody v-for="ad in adidas" :key="ad.modelo" class="align-items-center">
                                    <tr>
                                        <td colspan="3" class="align-middle">
                                            <h6>{{ad.modelo}}</h6>
                                        </td>
                                        <td class="align-middle">
                                            <div class="d-flex align-items-center"><img class="rounded-circle" :src="ad.img" width="60"></div>
                                        </td>
                                        <td class="align-middle">{{ad.fecha}}</td>
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
import release from "@/logic/release.js"

export default {
    components: {
        navbar
    },
    data: () => ({
        adidas: [],
        nike: []
    }),
    methods: {
        getRelease () {
            release.getRelease().then(response => {
                this.adidas = response.data.release.adidas
                this.nike = response.data.release.nike
                console.log(this.nike);
                console.log(this.adidas);
            })
        },
        goTo (url) {
            console.log(url);
            var win = window.open(url, '_blank');
            // Cambiar el foco al nuevo tab (punto opcional)
            win.focus();
        }
    },
    mounted() {
        this.getRelease()
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