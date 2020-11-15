<template>
  <v-app
      class="app d-flex justify-center align-center"
  >
    <div style="margin-top: 50px;">
      <v-snackbar
          v-model="showNotice"
          top
          right
          dark
          elevation="8"
          timeout="-1"
          :color="noticeColor"
          style="margin-top: 40px;"
      >
        <div style=" font-size: 20px;padding:15px 5px">
          <h1 style="font-size: 28px">游戏结束</h1>
          <v-divider style="margin: 15px 0px"/>
          {{notice}}
        </div>
      </v-snackbar>
      <players-drawer :player="player" style="margin-bottom: -310px; margin-left: 50px"></players-drawer>
      <v-card
          class="card"
          elevation="6"
      >
        <game-board
            :player="player"
            @end-event="observeEndEvent"
        ></game-board>
      </v-card>
    </div>
    <v-footer style="height: 20%; background-color: #707070; color: whitesmoke">
      <p style="font-size: 13px; text-align: center; margin: 0 auto">
        井字井字棋（TiTiTaTaToe）<br>
        作者：刘亦奇、蔡惊天<br>
        2020.11
      </p>
    </v-footer>
  </v-app>
</template>

<script>
import PlayersDrawer from "@/components/PlayersDrawer";
import GameBoard from "@/components/GameBoard";

export default {
  name: "Index",
  components: {GameBoard, PlayersDrawer},
  data() {
    return {
      player: '',
      showNotice: false,
      noticeColor: '',
      notice: '',
    }
  },
  created() {
    this.player = parseInt(this.$route.query.player);
  },
  methods:{
    observeEndEvent(data){
      if(data==='1') {
        this.noticeColor = 'deep-orange darken-2'
        this.notice = 'Player 1 获胜！'
      }
      else if(data==='2') {
        this.noticeColor = 'cyan darken-2'
        this.notice = 'Player 2 获胜！'
      }
      else if(data==='3'){
        this.notice = '平局！'
      }

      this.showNotice = true
    }
  }
}
</script>

<style scoped>
.app {
  font-size: 16px;
  background: #707070 !important;
}

.card {
  height: 600px;
  width: 600px;
  background-color: #292929;
  padding: 25px 50px 0px 50px;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 30px;
}
</style>