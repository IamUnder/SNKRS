<template lang="">
    <div>

        <!-- Navbar -->
        <navbar/>
        <!-- Contenido -->
        <div class="main">
            <div class="container">
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
                    <template v-if="post.length === 0">
                        <div class="border p-2 mb-3 ml-3" v-for="post in posts" :key="post._id">
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
                                        <small @click="goToPost(post._id)" class="text-muted"> {{timeAgo(post.date)}}</small>
                                    </h5>
                                    <div class="">
                                        {{ post.body }}
                                        <br />
                                        <a
                                            href="javascript: void(0);"
                                            class="text-muted font-13 d-inline-block mt-2"
                                            ><i class="mdi mdi-reply"></i> Reply</a
                                            >
                                        <small @click="goToPost(post._id)" class="pl-2"> Respuestas ( {{ post.reply.length }} )</small>
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
    </div>
</template>

<script>
// Importacion de componentes
import navbar from "@/components/navbar.vue"
import foro from "@/logic/foro.js"
import auth from "@/logic/auth.js"

export default {
    components: {
        navbar
    },
    data: () => ({
        user: {},
        post: "",
        posts: []
    }),
    mounted() {
        this.user = auth.getUser()
        this.getAllPost()
    },
    methods: {
        sendPost () {
            if (this.post != "") {
                const post = {
                    post: this.post
                }
                foro.createPost(post, this.user.token).then(() => {
                    this.getAllPost()
                })
            }
        },
        getAllPost () {
            foro.getAllPost(this.user.token).then( response => {
                this.posts = response.data.posts
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
        }
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
</style>