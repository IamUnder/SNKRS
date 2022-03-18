<template>

  <v-app>
    <head>
      <link rel="icon" type="image/png" sizes="96x96" href="./assets/favicon.ico">
    </head>
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        
      </div>

      <v-spacer></v-spacer>

    </v-app-bar> -->

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  
};
</script>

<style>

  .bg-orange {
    background-color: #F77F00;
  }

</style>
