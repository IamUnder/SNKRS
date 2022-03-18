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
                                <input id="uploadFiless" placeholder="Imagenes a subir" disabled="disabled" />
                                <div class="fileUpload btn btn-custom">
                                    <span>Añadir imagen</span>
                                    <input id="uploadBtn" type="file" accept="image/*" class="upload" multiple @change="onChange"/>
                                </div>
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
        fileArray: null
    }),
    methods: {
        onChange (event) {
            console.log('test');
            this.fileArray = event.target.files
            let text = ''
            for (const i of Object.keys(this.fileArray)) {
                //formData.append('fileArray', this.fileArray[i])
                text += this.fileArray[i].name + ' ,'
            }
            document.getElementById("uploadFiless").value = text
        },
        cerrar () {
            this.post = ''
            this.$emit('cerrar')
        },
        respuesta (id) {
            this.id = id
        },
        sendPost () {

            if (this.post != "") {
                
                const formData = new FormData()
                if (this.fileArray) {
                    for (const i of Object.keys(this.fileArray)) {
                        formData.append('fileArray', this.fileArray[i])
                    }
                }
                
                formData.append('parentId', this.id)
                formData.append('post', this.post)
                
                console.log(formData);

                Foro.reply(formData, this.token).then( () => {
                    this.cerrar()
                    this.post = ''
                })
            }

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

    .fileUpload {
    position: relative;
    overflow: hidden;
    margin: 10px;
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
</style>