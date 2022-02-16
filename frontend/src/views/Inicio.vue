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
                <div class="row mt-8">
                    
                    

                </div>
                    {{posts}}
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
                foro.createPost(post, this.user.token)
            }
        },
        getAllPost () {
            foro.getAllPost(this.user.token).then( response => {
                this.posts = response.data.posts
                console.log(this.posts);
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
</style>