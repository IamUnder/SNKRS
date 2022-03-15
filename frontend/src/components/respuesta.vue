<template lang="html">
    <div @respuesta="respuesta()">
        <div class="custom-modal" id="custom-modal">
            <div class="custom-content">
                <div class="row">
                    <div class="row mb-3">
                        <!-- comment box -->
                        <form action="javascript:void(0)" class="comment-area-box mb-15 mt-15">
                            <span class="input-icon">
                            <textarea
                                rows="3"
                                class="form-control"
                                placeholder="Que tienes que responder..."
                                v-model="post"
                                required
                                ></textarea>
                            </span>
                            <div class="comment-area-btn">
                                <div class="float-end">
                                    <button
                                        type="submit"
                                        class="btn btn-sm btn-custom waves-effect waves-light mr-4"
                                        @click="sendPost"
                                        >
                                    Reply
                                    </button>
                                    <button
                                        type="submit"
                                        class="btn btn-sm btn-custom2 waves-effect waves-light"
                                        @click="cerrar"
                                        >
                                    Cancelar
                                    </button>
                                </div>
                                <div>
                                    <a href="javascript:void(0)" class="btn btn-sm btn-light text-black-50"><i class="far fa-user"></i></a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import Auth from "@/logic/auth.js"
import Foro from "@/logic/foro.js"


export default {
    components: {

    },
    data: () => ({
        id: '',
        post: '',
        token: '',
    }),
    methods: {
        cerrar () {
            this.post = ''
            this.$emit('cerrar')
        },
        respuesta (id) {
            this.id = id
        },
        sendPost () {
            Foro.reply(this.post, this.id, this.token).then(() => {
                this.cerrar()
            }).catch(() => {
                this.cerrar()
            })
        }
    },
    mounted() {
        this.token = Auth.getUser().token
    },
}
</script>

<style lang="css" scoped>
    .display {
        display: none
    }

    .custom-modal {
        /* display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    .custom-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%; /* Could be more or less, depending on screen size */
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

    .btn-custom2 {
        background: #D62828;
        color: #003049;
    }
</style>