<template>
  <v-app
      class="app d-flex justify-center"
  >
    <div>
      <v-card
          class="card"
          elevation="6"
      >
        <router-view />
      </v-card>
    </div>
    <v-footer style="margin-top:50px; background-color: #707070; color: whitesmoke">
      <p style="font-size: 13px; text-align: center; margin: 0 auto">
        井字井字棋（TiTiTaTaToe）v2.1beta<br>
        作者：刘亦奇、蔡惊天<br>
        2020.11
      </p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
.app{
  font-size: 16px;
  background: #707070!important;
  padding-top: 60px;
}

.card{
  width: 358px;
  background-color: #292929;
  padding: 20px 15px;
  left: 50%;
  transform: translate(-50%);
}

</style>
