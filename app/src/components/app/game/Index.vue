<template>
  <div>
    <v-overlay
      :value="showNotice"
    >
      <v-snackbar
          v-model="showNotice"
          top
          dark
          elevation="8"
          timeout="-1"
          :color="noticeColor"
          style="margin-top: 130px;"
      >
        <div style=" font-size: 20px;padding:15px 5px">
          <h1 style="font-size: 28px">游戏结束</h1>
          <v-divider style="margin: 15px 0px"/>
          {{notice}}
        </div>
      </v-snackbar>
    </v-overlay>

    <app-game-board
        :player="player"
        :nowplayer="nowPlayer"
        @end-event="observeEndEvent"
        @now-player-event="observeNowPlayerEvent"
        @opponent-event="observeOpponentEvent"
    ></app-game-board>
    <app-players-drawer :player="player" :now-player="nowPlayer" ref="drawer" style="margin-bottom: 0px; margin-left: 20px"/>
  </div>

</template>

<script>
import AppGameBoard from "@/components/app/game/AppGameBoard";
import AppPlayersDrawer from "@/components/app/game/AppPlayersDrawer";

export default {
  name: "Index.vue",
  components: {AppGameBoard,AppPlayersDrawer},
  data() {
    return {
      player: '',
      nowPlayer: '1',
      showNotice: false,
      noticeColor: '',
      notice: '',
      opponent: 'Opponent',
    }
  },
  created() {
    this.player = parseInt(this.$route.query.player);
  },
  methods:{
    observeEndEvent(data){
      if(data==='1') {
        this.noticeColor = 'cyan darken-2'
        this.notice = 'Player 1 获胜！'
      }
      else if(data==='2') {
        this.noticeColor = 'deep-orange darken-2'
        this.notice = 'Player 2 获胜！'
      }
      else if(data==='3'){
        this.notice = '平局！'
      }

      this.showNotice = true
    },
    observeNowPlayerEvent(data){
      this.nowPlayer = data
    },
    observeOpponentEvent(data){
      this.$refs.drawer.setOpponent(data)
    }
  },
}
</script>

<style scoped>

</style>