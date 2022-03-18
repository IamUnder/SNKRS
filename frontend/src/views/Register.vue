<template>
  <div style="height: 100%">
    <div class="container-fluid bg-primary px-0" style="height: 96%">
      <div class="row px-0" style="height: 100%">
        <div class="col col-lg-6 img d-none d-md-inline" style="height: 100%">
          <!-- Parte vacia para mostar la imagen -->
        </div>
        
        <!-- Parte del formulario de Registro -->
        <div class="col bg-orange col-lg-6">
          <div class="row">
            <div class="col-12">
              <img src="../assets/logoB.png" class="mx-auto d-block" alt="" srcset="">
            </div>
          </div>
          <div class="row">
            <form action class="form" @submit.prevent="registro()">
              <!-- Usuario -->
              <div class="col-8 offset-2">
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text bg-b"  style="height: 100%">
                      <font-awesome-icon icon="fa-solid fa-envelope" class="text-light"/>
                    </span>
                  </div>
                  <input type="text" name="email" class="form-control input_user" value="" placeholder="email" v-model="email" required>
                </div>
              </div>

              <!-- Contraseña -->
              <div class="col-8 offset-2 mt-5">
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text bg-b"  style="height: 100%">
                      <font-awesome-icon icon="fa-solid fa-key" class="text-light"/>
                    </span>
                  </div>
                  <input type="password" name="password" class="form-control input_user" value="" placeholder="contraseña" v-model="password" required>
                </div>
              </div>

              <!-- Repetir contraseña -->
              <div class="col-8 offset-2 mt-5">
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text bg-b"  style="height: 100%">
                      <font-awesome-icon icon="fa-solid fa-key" class="text-light"/>
                    </span>
                  </div>
                  <input type="password" name="passwordC" class="form-control input_user" value="" placeholder="confirmar contraseña" v-model="passwordC" required>
                </div>
              </div>

              <!-- nombre -->
              <div class="col-8 offset-2 mt-5">
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text bg-b"  style="height: 100%">
                      <font-awesome-icon icon="fa-solid fa-font" class="text-light"/>
                    </span>
                  </div>
                  <input type="text" name="name" class="form-control input_user" value="" placeholder="Nombre publico" v-model="name" required>
                </div>
              </div>

              <!-- usuario -->
              <div class="col-8 offset-2 mt-5">
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text bg-b"  style="height: 100%">
                      <font-awesome-icon icon="fa-solid fa-user" class="text-light"/>
                    </span>
                  </div>
                  <input type="text" name="user" class="form-control input_user" value="" placeholder="Nombre de usuario" v-model="user" required>
                </div>
              </div>

              <p v-if="!valid" class="error">{{ error }}</p>

              <!-- Boton --> 
              <div class="col-8 offset-2 mt-5">
                  <v-btn type="submit" block color="#003049" class="text-light">REGISTRO</v-btn>
              </div>

              <div class="col-8 offset-2 mt-5 text-b">
                <h5>Ya tienes cuenta? <a href="/">Login aqui!</a></h5>
                <h5> - </h5>
              </div> 
            </form>
          </div>
        </div>
      </div>
    </div>
    <v-footer absolute color="#F77F00">
      <v-spacer></v-spacer>
      <div> &copy; {{ new Date().getFullYear() }} </div>
    </v-footer>
  </div>
</template>

<script>
  //import HelloWorld from '../components/HelloWorld'
  import auth from "@/logic/auth"

  export default {
    name: 'Login',

    components: {
     
    },
    data: () => ({
      name: "",
      email: "",
      password: "",
      passwordC: "",
      user: "",
      error: "",
      valid: true
    }),
    methods: {
      registro () {

        if (this.password != this.passwordC) {
          this.valid = false
          this.error = "Las contraseñas no son iguales"
          return false
        } else {

          auth.register(this.name, this.email, this.password, this.user).then(response => {
            console.log(response.data);

            this.$router.push("/")
          }).catch(error => {
            this.valid = false
            this.error = error.response.data.error
            console.log(this.error);
          })

        }

      } 
    }
  }
</script>

<style scoped>
  .img {
    background-size: 100% 100%;
    background-repeat:no-repeat;
    background:url(../assets/fondoLogin.jpg);
    background-size: cover;
  }

  .bg-b {
    background-color: #003049;
  }

  .text-b {
    color:#003049;
  }
</style>
