<template lang="html">
    <div>
        <!-- Navbar -->
        <navbar/>

        <!-- Contenido -->
        <div class="main" v-if="post">
            <div class="container">
                <!-- POST PRINCIPAL -->
                <div class="row mb-3">
                    <div class="border p-2 mb-3 ml-3" v-if="post">
                        <!-- Parent -->
                        <div class="border p-2 mb-3 ml-3" v-if="parent.length != 0">
                            <div class="d-flex align-items-start">
                                <img
                                    class="me-2 avatar-sm rounded-circle"
                                    :src="parent.imgUser"
                                    alt="imagen de perfil"
                                    v-if="parent.imgUser"
                                    />
                                <img
                                    class="me-2 avatar-sm rounded-circle"
                                    src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                    alt="imagen de perfil"
                                    v-else
                                    />
                                <div class="w-100">
                                    <h5 class="">
                                        <small @click="goTo(parent.user)">{{ parent.nameUser }} </small>
                                        <small @click="goTo(parent.user)">@{{ parent.user }}</small>
                                        <small @click="goToPost(parent._id)" class="text-muted"> {{timeAgo(parent.date)}}</small>
                                    </h5>
                                    <div class="">
                                        {{ parent.body }}
                                        <br />
                                        <a
                                            href="javascript: void(0);"
                                            class="text-muted font-13 d-inline-block mt-2"
                                            @click="responder(parent._id)"
                                            ><i class="mdi mdi-reply"></i> Reply</a
                                            >
                                        <a
                                            href="javascript: void(0);"
                                            class="text-muted font-13 d-inline-block mt-2 ml-2"
                                            @click="fav(parent._id)"
                                            v-if="parent.fav"
                                            >
                                            <i class="mdi mdi-star" v-if="parent.fav.includes(id)"></i>
                                            <i class="mdi mdi-star-outline" v-else></i>
                                            Favorito ({{ parent.fav.length }})
                                        </a>
                                        <small v-if="parent.reply" @click="goToPost(parent._id)" class="pl-2"> Respuestas ( {{ parent.reply.length }} )</small>
                                    </div>
                                </div>
                            </div> 
                            <div class="container-fluid" v-if="parent.files.length != 0">
                                <div class="row">
                                    <div class="col" v-for="file in parent.files" :key="file.key">
                                        <img :src="file" alt="..." class="img-thumbnail">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- End parent -->

                        <div class="d-flex align-items-start">
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
                                    <small class="text-muted"> {{timeAgo(post.date)}}</small>
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
                                        v-if="post.fav"
                                        >
                                        <i class="mdi mdi-star" v-if="post.fav.includes(id)"></i>
                                        <i class="mdi mdi-star-outline" v-else></i>
                                        Favorito ({{ post.fav.length }})
                                    </a>
                                    <small v-if="post.reply" class="pl-2"> Respuestas ( {{ post.reply.length }} )</small>
                                </div>
                            </div>
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
                <!-- Respuestas -->
                <hr class=" ml-3">
                <div class="row mb-3" v-if="reply.length != 0">
                    <div class="border p-2 mb-3 ml-3" v-for="re in reply" :key="re._id">
                        <div class="d-flex align-items-start">
                            <!-- Imagen de perfil WIP -->
                            <img
                                class="me-2 avatar-sm rounded-circle"
                                :src="re.imgUser"
                                alt="imagen de perfil"
                                v-if="re.imgUser"
                                />
                            <img
                                class="me-2 avatar-sm rounded-circle"
                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                alt="imagen de perfil"
                                v-else
                                />
                            <div class="w-100">
                                <h5 class="">
                                    <small @click="goTo(re.user)">{{ re.nameUser }} </small>
                                    <small @click="goTo(re.user)">@{{ re.user }}</small>
                                    <small @click="goToPost(re._id)" class="text-muted"> {{timeAgo(re.date)}}</small>
                                </h5>
                                <div class="">
                                    {{ re.body }}
                                    <br />
                                    <a
                                        href="javascript: void(0);"
                                        class="text-muted font-13 d-inline-block mt-2"
                                        @click="responder(re._id)"
                                        ><i class="mdi mdi-reply"></i> Reply</a
                                        >
                                    <a
                                        href="javascript: void(0);"
                                        class="text-muted font-13 d-inline-block mt-2 ml-2"
                                        @click="fav(re._id)"
                                        v-if="re.fav"
                                        >
                                        <i class="mdi mdi-star" v-if="re.fav.includes(id)"></i>
                                        <i class="mdi mdi-star-outline" v-else></i>
                                        Favorito ({{ re.fav.length }})
                                    </a>
                                    <small v-if="re.reply" @click="goToPost(re._id)" class="pl-2"> Respuestas ( {{ re.reply.length }} )</small>
                                </div>
                            </div>
                        </div>
                        <div class="container-fluid" v-if="re.files.length != 0">
                            <div class="row">
                                <div class="col" v-for="file in re.files" :key="file.key">
                                    <img :src="file" alt="..." class="img-thumbnail">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <respuesta class="display" id="modal" ref="modal" @cerrar="toggle"/>
    </div>
</template>

<script>
    
     // Importacion de componentes
    import navbar from "@/components/navbar.vue";
    import respuesta from "@/components/respuesta.vue"
    import auth from '@/logic/auth.js'
	import foro from '@/logic/foro.js'

    export default {
        components: {
            navbar,
            respuesta
        },
        data: () => ({
            post: [],
            parent: [],
            reply: [],
            id: '',
            token: ''
        }),
        methods: {
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
                this.getPost()
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
            getPost() {
                foro.getOnePost(this.$route.params.id).then(response => {
                    this.post = response.data.post
                    this.parent = response.data.parent
                    this.reply = response.data.reply
                })
            },
            responder (id) {
                
                this.toggle()
                this.$refs.modal.respuesta(id)
                
            },
            toggle () {
                var modal = document.getElementById('modal')

                modal.classList.toggle('display')

                this.getPost()
            },
            fav (id) {
                foro.fav(id, this.token).then(response => {
                    console.log(response.data);
                    this.getPost()
                }).catch(() =>{
                    this.getPost()
                })
            }
        },
        mounted() {
            this.getPost()

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
    
    .display {
        display: none
    }

    a {
        text-decoration: none;
    }
</style>