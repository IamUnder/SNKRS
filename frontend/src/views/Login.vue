<template>
  <div style="height: 100%">
    <div class="container-fluid bg-primary px-0" style="height: 96%">
      <div class="row px-0" style="height: 100%">
        <div class="col col-lg-6 img d-none d-md-inline" style="height: 100%">
          <!-- Parte vacia para mostar la imagen -->
        </div>
        
        <!-- Parte del formulario de login -->
        <div class="col bg-orange col-lg-6">
          <div class="row pt-10">
            <div class="col-12">
              <img src="../assets/logoB.png" class="mx-auto d-block" alt="" srcset="">
            </div>
          </div>
          <div class="row mt-10">
            <form action class="form" @submit.prevent="login()">
              <!-- Usuario -->
              <div class="col-8 offset-2">
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <span class="input-group-text bg-b"  style="height: 100%">
                      <font-awesome-icon icon="fa-solid fa-user" class="text-light"/>
                    </span>
                  </div>
                  <input type="text" name="user" class="form-control input_user" value="" placeholder="usuario o email" v-model="user" required>
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

              <p v-if="valid" class="error">{{ error }}</p>

              <!-- Boton --> 
              <div class="col-8 offset-2 mt-5">
                  <v-btn type="submit" block color="#003049" class="text-light">LOGIN</v-btn>
              </div>

              <div class="col-8 offset-2 mt-5 text-b">
                <h5>Aun no tienes cuenta? <a href="">Registrate aqui!</a></h5>
                <h5>¿Olvidaste tu contraseña?</h5>
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
      user: "",
      password: "",
      error: "",
      valid: false
    }),
    methods: {
      login () {
        auth.login(this.user, this.password).then(response => {
          console.log(response);

          this.$router.push("/Inicio")
        }).catch((error) => {
          this.valid = !this.valid
          this.error = error.response.data.error
          console.log(error.response)
        })
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
