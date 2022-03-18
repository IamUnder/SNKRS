<template lang="">
    <div>

        <!-- Navbar -->
        <navbar/>
        <!-- Contenido -->
        <div class="main">
            <div class="container">
                <div class="row mb-3">
                    <div class="mb-4">
                        <label class="custom-control teleport-switch">
                            <span class="teleport-switch-control-description">Todos los post</span>
                            <input type="checkbox" class="teleport-switch-control-input" checked="true" @click="switchVista()">
                            <span class="teleport-switch-control-indicator"></span>
                            <span class="teleport-switch-control-description">Gente que sigues</span>
                        </label>
                    </div>
                </div>
                <div class="row mb-3">
                    <!-- comment box -->
                    <form action="javascript:void(0)" class="comment-area-box mb-3">
                        <span class="input-icon">
                        <textarea
                            rows="3"
                            class="form-control"
                            placeholder="Que tienes que contar..."
                            v-model="post"
                            required
                            ></textarea>
                        </span>
                                
                        <div class="comment-area-btn">
                            <input id="uploadFile" placeholder="Imagenes a subir" disabled="disabled" />
                            <div class="fileUpload btn btn-custom">
                                <span>Añadir imagen</span>
                                <input id="uploadBtn" type="file" accept="image/*" class="upload" multiple @change="onChange"/>
                            </div>
                            <div class="float-end">
                                <button
                                    type="submit"
                                    class="btn btn-sm btn-custom waves-effect waves-light"
                                    @click="sendPost"
                                    >
                                Post
                                </button>
                            </div>
                            <div>
                                <a href="javascript:void(0)" class="btn btn-sm btn-light text-black-50"><i class="far fa-user"></i></a>
                            </div>
                        </div>
                    </form>
                </div>
                <hr>
                <div class="row mt-8 mr-2">
                    <template v-if="posts.length != 0">
                        <div class="border p-2 mb-3 ml-3" v-for="post in posts" :key="post._id">
                            <div class="d-flex align-items-start">
                                <!-- Imagen de perfil WIP -->
                                <img
                                class="me-2 avatar-sm rounded-circle"
                                :src="post.imgUser"
                                alt="imagen de perfil"
                                v-if="post.imgUser"
                                />
                                <img
                                class="me-2 avatar-sm rounded-circle"
                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                alt="imagen de perfil"
                                v-else
                                />
                                <div class="w-100">
                                    <h5 class="">
                                        <small @click="goTo(post.user)">{{ post.nameUser }} </small>
                                        <small @click="goTo(post.user)">@{{ post.user }}</small>
                                        <small @click="goToPost(post._id)" class="text-muted"> {{timeAgo(post.date)}}</small>
                                    </h5>
                                    <div class="">
                                        {{ post.body }}
                                        <br />
                                        <a
                                            href="javascript: void(0);"
                                            class="text-muted font-13 d-inline-block mt-2"
                                            @click="responder(post._id)"
                                            ><i class="mdi mdi-reply"></i> Reply</a
                                            >
                                        <a
                                            href="javascript: void(0);"
                                            class="text-muted font-13 d-inline-block mt-2 ml-2"
                                            @click="fav(post._id)"
                                            >
                                            <i class="mdi mdi-star" v-if="post.fav.includes(user.id)"></i>
                                            <i class="mdi mdi-star-outline" v-else></i>
                                            Favorito ({{ post.fav.length }})
                                        </a>
                                        <small @click="goToPost(post._id)" class="pl-2"> Respuestas ( {{ post.reply.length }} )</small>
                                    </div>
                                    <div class="container-fluid" v-if="post.files.length != 0">
                                        <div class="row">
                                            <div class="col" v-for="file in post.files" :key="file.key">
                                                <img :src="file" alt="..." class="img-thumbnail">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <h3 class="header-title mb-3 text-center">
                            Aun no sigues a nadie 
                        </h3>
                    </template>
                </div>
            </div>
        </div>
        <respuesta class="display" id="modal" ref="modal" @cerrar="toggle"/>
    </div>
</template>

<script>
// Importacion de componentes
import navbar from "@/components/navbar.vue"
import respuesta from "@/components/respuesta.vue"
import foro from "@/logic/foro.js"
import auth from "@/logic/auth.js"

export default {
    components: {
        navbar,
        respuesta
    },
    data: () => ({
        user: {},
        post: "",
        posts: [],
        fileArray: null,
        estado: true
    }),
    mounted() {
        this.user = auth.getUser()
        this.getPost()
    },
    methods: {
        switchVista () {
            this.estado = !this.estado

            if (this.estado) {
                this.getPost()
            } else {
                this.getAllPost()
            }
        },
        onChange (event) {
            console.log('test');
            this.fileArray = event.target.files
            let text = ''
            for (const i of Object.keys(this.fileArray)) {
                //formData.append('fileArray', this.fileArray[i])
                text += this.fileArray[i].name + ' ,'
            }
            document.getElementById("uploadFile").value = text
        },
        sendPost () {
            if (this.post != "") {
                
                const formData = new FormData()
                if (this.fileArray) {
                    for (const i of Object.keys(this.fileArray)) {
                        formData.append('fileArray', this.fileArray[i])
                    }
                }
                
                formData.append('post', this.post)
                
                console.log(formData);

                foro.createPost(formData, this.user.token).then( () => {
                    this.getAllPost()
                    this.post = ''
                })
            }
        },
        getPost () {
            foro.getAllPost(this.user.token).then( response => {
                this.posts = response.data.posts
            })
        },
        getAllPost () {
            foro.getAll(this.user.token).then( response => {
                this.posts = response.data.posts
            })
        },
        responder (id) {
            
            this.toggle()
            this.$refs.modal.respuesta(id)
            
        },
        toggle () {
            var modal = document.getElementById('modal')

            modal.classList.toggle('display')

            this.getAllPost()
        },
        timeAgo (date) {

            var postDate = new Date(date)
            var seconds = Math.floor((new Date() - postDate) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
                return "Hace " + Math.floor(interval) + " años";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return "Hace " + Math.floor(interval) + " meses";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return "Hace " + Math.floor(interval) + " dias";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return "Hace " + Math.floor(interval) + " horas";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return "Hace " + Math.floor(interval) + " minutos";
            }
            return "Hace " + Math.floor(seconds) + " seconds";
        },
        goTo (user) {
            this.$router.push({
                name: 'SNRKS: Perfil',
                params: {
                    user: user
                }
            })
        },
        goToPost (id){
            this.$router.push({
                name: 'SNRKS: Post',
                params: {
                    id: id
                }
            })
        },
        fav (id) {
            foro.fav(id, this.user.token).then(response => {
                console.log(response.data);
                this.getAllPost()
            }).catch(() =>{
                this.getAllPost
            })
        }
    },
}
</script>

<style lang="css" scoped>
    .display {
        display: none
    }

    .main {
        margin-top: 5%;
        margin-left: 5%;
    }

    .comment-area-box .comment-area-btn {
        background-color: #f2f8fb;
        padding: 10px;
        border: 1px solid #dee2e6;
        border-top: none;
        border-radius: 0 0 .2rem .2rem;
    }

    .btn-custom {
        background: #F77F00;
        color: #003049;
    }

    .me-2 {
        margin-right: .75rem!important;
    }

    .avatar-sm {
        height: 2.25rem;
        width: 2.25rem;
    }

    .rounded-circle {
        border-radius: 50%!important;
    }

    a {
        text-decoration: none;
    }

    .fileUpload {
    position: relative;
    overflow: hidden;
    margin: 1px;
    }

    .fileUpload input.upload {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
    }

    .custom-control.teleport-switch {
    --color: #F77F00;
    padding-left: 0; }
    .custom-control.teleport-switch .teleport-switch-control-input {
    display: none; }
    .custom-control.teleport-switch .teleport-switch-control-input:checked ~ .teleport-switch-control-indicator {
        border-color: var(--color); }
    .custom-control.teleport-switch .teleport-switch-control-input:checked ~ .teleport-switch-control-indicator::after {
        left: -14px; }
    .custom-control.teleport-switch .teleport-switch-control-input:checked ~ .teleport-switch-control-indicator::before {
        right: 2px;
        background-color: var(--color); }
    .custom-control.teleport-switch .teleport-switch-control-input:disabled ~ .teleport-switch-control-indicator {
        opacity: .4; }
    .custom-control.teleport-switch .teleport-switch-control-indicator {
    display: inline-block;
    position: relative;
    margin: 0 10px;
    top: 4px;
    width: 32px;
    height: 20px;
    background: #fff;
    border-radius: 16px;
    -webkit-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
    border: 2px solid #ccc;
    overflow: hidden; }
    .custom-control.teleport-switch .teleport-switch-control-indicator::after {
        content: '';
        display: block;
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        -webkit-transition: .3s;
        -o-transition: .3s;
        transition: .3s;
        top: 2px;
        left: 2px;
        background: #ccc; }
    .custom-control.teleport-switch .teleport-switch-control-indicator::before {
        content: '';
        display: block;
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        -webkit-transition: .3s;
        -o-transition: .3s;
        transition: .3s;
        top: 2px;
        right: -14px;
        background: #ccc; }

</style>