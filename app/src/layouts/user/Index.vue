<template>
  <v-app
      class="app d-flex justify-center align-center"
  >
    <div style="height: 60%">
      <v-card
          class="card"
          elevation="6"
      >
        <router-view />
      </v-card>
    </div>
    <v-footer style="height: 30%; background-color: #707070; color: whitesmoke">
      <p style="font-size: 13px; text-align: center; margin: 0 auto">
        游戏规则：大棋盘由3×3个标准3×3井字棋棋盘组成，上位玩家在其中一个小棋盘上落子后，下位玩家必须在大棋盘上对应位置的小棋盘落子。<br>
        当其中一方玩家赢下任意一个小棋盘（小棋盘获胜规则同普通井字棋）即视为获胜。<br>
        注意：当前版本不支持并发游戏，同一时间系统只支持一局对局！<br><br>
        井字井字棋（TiTiTaTaToe）<br>
        作者：刘亦奇、蔡惊天<br>
        2020.11
      </p>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'User',
}
</script>

<style scoped>
.app{
  font-size: 16px;
  background: #707070!important;
  padding-top: 100px;
}

.card{
  width: 450px;
  background-color: #292929;
  padding: 40px 40px 58px 40px;
  left: 50%;
  transform: translate(-50%);
}

</style>
