<template lang="">
<div>
	<!-- Navbar -->
	<navbar />
	<!-- Contenido -->
	<div class="main">
		<div class="container">
			<div class="row">
				<div class="col-xl-5">
					<div class="card">
						<div class="card-body">
							<div class="dropdown float-end">
								<a  
									href="#"
									class="dropdown-toggle arrow-none card-drop"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									>
								<i class="mdi mdi-dots-vertical"></i>
								</a>
								<div class="dropdown-menu dropdown-menu-end">
									<!-- Editar perfil WIP -->
									<a href="javascript:void(0);" class="dropdown-item" v-if="!estado" v-on:click="edit()">Editar</a>
                                    <a href="javascript:void(0);" class="dropdown-item" v-if="estado" v-on:click="edit(true)">Confirmar cambios</a>
								</div>
							</div>
							<div class="d-flex align-items-start">
                                
                                <img
									:src="user.img"
									class="rounded-circle avatar-lg img-thumbnail"
									alt="profile-image"
                                    v-if="user.img"
									/>
                                <img
									src="https://bootdey.com/img/Content/avatar/avatar1.png"
									class="rounded-circle avatar-lg img-thumbnail"
									alt="profile-image"
                                    v-else
									/>
								
								<div class="w-100 ms-3">
                                    <!-- Nombre -->
                                    <div>
                                        <h4 class="my-0" v-if="!estado">{{user.name}}</h4>
                                        <input type="text" class="form-control col-4" v-bind="name" placeholder="Nuevo nombre" v-if="estado">
                                    </div>
                                    <div>
                                        <p class="text-muted" v-if="!estado">@{{user.user}}</p>
                                        <input type="text" class="form-control col-4" v-bind="user" placeholder="Nuevo usuario" v-if="estado">
                                    </div>
								</div>
							</div>
                            <div v-if="estado">
                                <form enctype="multipart/form-data">
                                    <input id="uploadFile" placeholder="File Name here" disabled="disabled" />
                                    <div class="fileUpload btn btn-custom">
                                        <span>Seleccionar imagen</span>
                                        <input id="uploadBtn" type="file" accept="image/*" class="upload" @change="handleFileUpload( $event )"/>
                                    </div>
                                </form>
                            </div>
							<div class="mt-3">
                                <div v-if="!estado">
                                    <h4 class="font-13 text-uppercase">Descripcion :</h4>
                                    <p class="text-muted font-13 mb-3">
                                        {{user.descripcion || 'Sin descripción'}}
                                    </p>
                                </div>
                                <div v-if="estado">
                                    <textarea
									rows="3"
									class="form-control"
									placeholder=""
                                    v-model="descripcion"
									></textarea>
                                </div>
								<p class="text-muted mb-2 font-13">
									<strong>Email :</strong>
									<span class="ms-2">{{user.email}}</span>
								</p>
							</div>
						</div>
					</div>
					<!-- end card -->
					<div class="card">
						<div class="card-body text-center">
							<div class="row">
								<div class="col-4 border-end border-light">
									<h5 class="text-muted mt-1 mb-2 fw-normal">Post</h5>
									<h2 v-if="posts" class="mb-0 fw-bold">{{posts.length}}</h2>
								</div>
								<div class="col-4 border-end border-light">
									<h5 class="text-muted mt-1 mb-2 fw-normal">Follows</h5>
									<h2 v-if="user.follow" class="mb-0 fw-bold">{{user.follow.length}}</h2>
								</div>
								<div class="col-4 border-end border-light">
									<h5 class="text-muted mt-1 mb-2 fw-normal">Followers</h5>
									<h2 v-if="user.followers" class="mb-0 fw-bold">{{user.followers.length}}</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- end col-->
				<div class="col-xl-7">
					<div class="card">
						<div class="card-body">
							<!-- comment box -->
							<form action="javascript:void(0)" class="comment-area-box mb-3">
								<span class="input-icon">
								<textarea
									rows="3"
									class="form-control"
									placeholder="Que tienes que decir..."
                                    required
                                    v-model="post"
									></textarea>
								</span>
								<div class="comment-area-btn">
                                    <input id="uploadFiles" placeholder="Imagenes a subir" disabled="disabled" />
                                    <div class="fileUpload btn btn-custom">
                                        <span>Añadir imagen</span>
                                        <input id="uploadBtn" type="file" accept="image/*" class="upload" multiple @change="onChange"/>
                                    </div>
									<div class="float-end">
										<button
											type="submit"
											class="btn btn-sm btn-custom waves-effect waves-light"
                                            @click="sendPost()"
											>
										Post
										</button>
									</div>
									<div>
										<a href="javascript:void(0)" class="btn btn-sm btn-light text-black-50"><i class="far fa-user"></i></a>
									</div>
								</div>
							</form>
							<!-- end comment box -->
							<!-- Story Box-->
							<div class="border p-2 mb-3" v-for="post in posts" :key="post.id">
                                <!-- Post -->
								<div class="d-flex align-items-start">
									<img
										class="me-2 avatar-sm rounded-circle"
										:src="user.img"
										alt="Foto del usuario" 
                                        v-if="user.img"
										/>
                                    <img
										class="me-2 avatar-sm rounded-circle"
										src="https://bootdey.com/img/Content/avatar/avatar4.png"
										alt="Foto del usuario" 
                                        v-else
										/>
									<div class="w-100">
										<h5 class="">
                                            {{post.nameUser}}
											<small @click="goToPost(post._id)" class="text-muted">{{ timeAgo(post.date) }}</small>
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
					</div>
					<!-- end card-->
				</div>
				<!-- end col -->
			</div>
			<!-- end row-->
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
    import profile from '@/logic/options.js'
    import foro from '@/logic/foro.js'

    export default {
        components: {
            navbar,
            respuesta
        },
        data: () => ({
            user: [],
            estado: false,
            descripcion: "",
            userName: "",
            name: "",
            posts: [],
            post: "",
            file: '',
            fileArray: null
        }),
        methods: {
            handleFileUpload( event ){
                this.file = event.target.files[0]
                document.getElementById("uploadFile").value = this.file.name
            },
            onChange (event) {
                console.log('test');
                this.fileArray = event.target.files
                let text = ''
                for (const i of Object.keys(this.fileArray)) {
                    //formData.append('fileArray', this.fileArray[i])
                    text += this.fileArray[i].name + ' ,'
                }
                document.getElementById("uploadFiles").value = text
            },
            edit (confirm) {

                this.estado = !this.estado
                
                if (confirm) {

                    var formData = new FormData()
                    formData.append('descripcion', this.descripcion)
                    formData.append('user', this.userName)
                    formData.append('name', this.name)
                    formData.append('file', this.file)

                    // var options = {
                    //     descripcion: this.descripcion,
                    //     user: this.userName,
                    //     name: this.name
                    // }

                    profile.updateProfile(formData, this.user.token).then(() =>{
                        this.user = auth.getUser()

                        this.descripcion = this.user.descripcion || ""
                        this.userName = this.user.user
                        this.name = this.user.name
                        this.file = ''
                    }).catch((error) => {
                        console.log(error.response)
                    })
                }
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
                        this.getPost()
                        this.post = ''
                    })
                }
            },
            getPost () {
                foro.getPost(this.user.id).then(response => {
                this.posts = response.data.posts
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
                foro.fav(id, this.user.token).then(() => {
                    this.getPost()
                }).catch(() =>{
                    this.getPost()
                })
            }
        },
        mounted() {
            this.user = auth.getUser()

            this.descripcion = this.user.descripcion || ""
            this.userName = this.user.user
            this.name = this.user.name

            this.getPost()
        },
    };
</script>

<style lang="css" scoped>
    .main {
        margin-top: 5%;
        margin-left: 5%;
    }

    .card {
        box-shadow: 0 0 2px 0 rgb(0 0 0 / 10%);
        margin-bottom: 24px;
    }
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 0 solid #ecf2f5;
        border-radius: .25rem;
    }
    .avatar-lg {
        height: 4.5rem;
        width: 4.5rem;
    }
    .rounded-circle {
        border-radius: 50%!important;
    }
    .img-thumbnail {
        padding: .25rem;
        background-color: #ecf2f5;
        border: 1px solid #dee2e6;
        border-radius: .25rem;
        max-width: 100%;
        height: auto;
    }
    .avatar-sm {
        height: 2.25rem;
        width: 2.25rem;
    }
    .rounded-circle {
        border-radius: 50%!important;
    }
    .me-2 {
        margin-right: .75rem!important;
    }
    .avatar-md {
        height: 3.5rem;
        width: 3.5rem;
    }
    .rounded-circle {
        border-radius: 50%!important;
    }
    .bg-transparent {
        --bs-bg-opacity: 1;
        background-color: transparent!important;
    }
    .post-user-comment-box {
        background-color: #f2f8fb;
        margin: 0 -.75rem;
        padding: 1rem;
        margin-top: 20px;
    }
    .simplebar-wrapper {
        overflow: hidden;
        width: inherit;
        height: inherit;
        max-width: inherit;
        max-height: inherit;
    }
    .simplebar-height-auto-observer-wrapper {
        box-sizing: inherit!important;
        height: 100%;
        width: 100%;
        max-width: 1px;
        position: relative;
        float: left;
        max-height: 1px;
        overflow: hidden;
        z-index: -1;
        padding: 0;
        margin: 0;
        pointer-events: none;
        flex-grow: inherit;
        flex-shrink: 0;
        flex-basis: 0;
    }
    .font-13 {
        font-size: 13px!important;
    }
    .btn-soft-info {
        color: #45bbe0;
        background-color: rgba(69,187,224,.18);
        border-color: rgba(69,187,224,.12);
    }
    .social-list-item {
        height: 2rem;
        width: 2rem;
        line-height: calc(2rem - 2px);
        display: block;
        border: 2px solid #adb5bd;
        border-radius: 50%;
        color: #adb5bd;
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

    .display {
        display: none
    }
    
    a {
        text-decoration: none;
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
