<template lang="html">
    <div>
        <!-- Navbar -->
        <navbar/>

        <!-- Contenido -->
        <div class="main" v-if="post">
            <div class="container">
                <div class="row mb-3">
                    <div class="border p-2 mb-3 ml-3" v-if="post">
                        <div class="d-flex align-items-start">
                            <!-- Imagen de perfil WIP -->
                            <img
                                class="me-2 avatar-sm rounded-circle"
                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                alt="imagen de perfil"
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
                                    <small @click="goToPost(post._id)" class="pl-2"> Respuestas ( {{ post.reply.length }} )</small>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        {{reply}}
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
            }
        },
        mounted() {
            this.getPost()

            this.token = auth.getUser().token
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