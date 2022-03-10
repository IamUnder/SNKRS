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
							<div class="d-flex align-items-start">
                                <!-- Imagen de perfil, si no tiene muestra esa WIP -->
								<img 
									src="https://bootdey.com/img/Content/avatar/avatar1.png"
									class="rounded-circle avatar-lg img-thumbnail"
									alt="profile-image"
									/>
								<div class="w-100 ms-3">
									<h4 class="my-0">{{user.name}}</h4>
									<p class="text-muted">@{{user.user}}</p>
									<button
										type="button"
										class="btn btn-custom btn-xs waves-effect mb-2 waves-light"
                                        @click="follow"
										>
									Follow
									</button>
									<button
										type="button"
										class="btn btn-custom2 btn-xs waves-effect mb-2 waves-light"
                                        @click="edit"
										>
									Unfollow
									</button>
								</div>
							</div>
							<div class="mt-3">
								<h4 class="font-13 text-uppercase">Descripcion :</h4>
								<p class="text-muted font-13 mb-3">
									{{user.descripcion || 'Sin descripción'}}
								</p>
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
									<h5 class="text-muted mt-1 mb-2 fw-normal">Coleccion</h5>
									<h2 class="mb-0 fw-bold">{{coleccion.length}}</h2>
								</div>
								<div class="col-4 border-end border-light">
									<h5 class="text-muted mt-1 mb-2 fw-normal">Ventas</h5>
									<h2 class="mb-0 fw-bold">{{ventas.length}}</h2>
								</div>
								<div class="col-4">
									<h5 class="text-muted mt-1 mb-2 fw-normal">Vendido</h5>
									<h2 class="mb-0 fw-bold">{{vendido}}</h2>
								</div>
							</div>
						</div>
					</div>
					<div class="card">
						<div class="card-body">
							<h4 class="header-title mb-3 text-center">
								Coleccion <font-awesome-icon icon="fa-solid fa-circle-plus" />
							</h4>
							<div class="list-group">
								<a href="javascript:void(0)" class="list-group-item list-group-item-action">
									<div class="d-flex align-items-center pb-1" id="tooltips-container">
										<div class="w-100 ms-2">
											<h5 class="mb-1">
												Modelo
											</h5>
											<p class="mb-0 font-13 text-muted">Marca</p>
										</div>
                                        <p>precio</p>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				<!-- end col-->
				<div class="col-xl-7">
					<div class="card">
						<div class="card-body">
							<!-- Story Box-->
							<div class="border p-2 mb-3" v-for="post in posts" :key="post.id">
                                <!-- Post -->
								<div class="d-flex align-items-start">
									<img
										class="me-2 avatar-sm rounded-circle"
										src="https://bootdey.com/img/Content/avatar/avatar4.png"
										alt="Generic placeholder image"
										/>
									<div class="w-100">
										<h5 class="">
											{{ user.name }}
											<small class="text-muted"> {{ timeAgo(post.date) }} </small>
										</h5>
										<div class="">
											{{ post.body }}
											<br />
											<a
												href="javascript: void(0);"
												class="text-muted font-13 d-inline-block mt-2"
												><i class="mdi mdi-reply"></i> Reply</a
												>
										</div>
									</div>
								</div>
                                <!-- Respuesta -->
								<!-- <div class="post-user-comment-box"> -->
									<!-- <div class="d-flex align-items-start">
										<img
											class="me-2 avatar-sm rounded-circle"
											src="https://bootdey.com/img/Content/avatar/avatar3.png"
											alt="Generic placeholder image"
											/>
										<div class="w-100">
											<h5 class="mt-0">
												Jeremy Tomlinson
												<small class="text-muted">3 hours ago</small>
											</h5>
											Nice work, makes me think of The Money Pit.
											<br />
											<a
												href="javascript: void(0);"
												class="text-muted font-13 d-inline-block mt-2"
												><i class="mdi mdi-reply"></i> Reply</a
												>
											<div class="d-flex align-items-start mt-3">
												<a class="pe-2" href="#">
												<img
													src="https://bootdey.com/img/Content/avatar/avatar4.png"
													class="avatar-sm rounded-circle"
													alt="Generic placeholder image"
													/>
												</a>
												<div class="w-100">
													<h5 class="mt-0">
														Kathleen Thomas
														<small class="text-muted">5 hours ago</small>
													</h5>
													i'm in the middle of a timelapse animation myself!
													(Very different though.) Awesome stuff.
												</div>
											</div>
										</div>
									</div> -->
                                    <!-- Respuesta de respuesta, sin cuenta no deberia de salir --> 
									<!-- <div class="d-flex align-items-start mt-2">
										<a class="pe-2" href="#">
										<img
											src="https://bootdey.com/img/Content/avatar/avatar1.png"
											class="rounded-circle"
											alt="Generic placeholder image"
											height="31"
											/>
										</a>
										<div class="w-100">
											<input
												type="text"
												id="simpleinput"
												class="form-control border-0 form-control-sm"
												placeholder="Add comment"
												/>
										</div>
									</div> -->
								<!-- </div> -->
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
</div>
</template>

<script>
    // Importacion de componentes
    import navbar from "@/components/navbar.vue";
    import auth from '@/logic/auth.js'
	import foro from '@/logic/foro.js'

    export default {
        components: {
            navbar,
        },
        data: () => ({
            user: {},
            estado: false,
			posts: [],
			token: [],
            // WIP
            coleccion: [],
            ventas: [],
            vendido: 0
        }),
        methods: {
            edit () {

                if (this.estado) {
                    console.log('Habria que guardar cambios');
                }

                this.estado = !this.estado
                console.log(this.estado);
            },
			follow () {
				var body = {
					id: this.user.id 
				}
				foro.follow(body, this.token).then( response => {
					console.log(response.data);
				}).catch()
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
            }
        },
        mounted() { 
			auth.getOneUser(this.$route.params.user).then(response => {
				this.user = response.data.user
				foro.getPost(this.user.id).then(response => {
					this.posts = response.data.posts
				})
			}).catch( () => {
				this.$router.push('/inicio')
			})

			this.token = auth.getUser().token
			console.log(this.token);
            console.log(this.user)
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

	.btn-custom2 {
        background: #EAE2B7;
        color: #003049;
    }
</style>
