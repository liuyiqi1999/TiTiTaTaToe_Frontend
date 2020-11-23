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
          {{ notice }}
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
    <app-players-drawer :player="player" :now-player="nowPlayer" ref="drawer"
                        style="margin-bottom: 0px; margin-left: 20px"/>
    <v-card-text class="d-flex justify-space-between align-center" style="height:60px; padding: 0; margin-left: 8px">
      <v-btn
          color="blue"
          dark
          bottom
          left
          fab
      >
        <v-icon>mdi-chat-outline</v-icon>
      </v-btn>
      <v-speed-dial
          v-model="fab"
          right
          bottom
          direction="left"
          transition="slide-x-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn
              color="pink"
              dark
              absolute
              bottom
              right
              fab
              style="margin:0 -18px -16px 0"
          >
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
          <v-btn
              fab
              small
              color="white"
              style="margin-left: -140px; margin-bottom: -25px"
          >
            <v-icon>mdi-flag-outline</v-icon>
          </v-btn>
          <v-btn
              fab
              dark
              small
              color="green"
              style="margin-left: -250px; margin-bottom: -25px"
          >
            <v-icon>mdi-handshake</v-icon>
          </v-btn>
          <v-btn
              fab
              dark
              small
              color="grey"
              style="margin-left: -360px; margin-bottom: -25px"
          >
            <v-icon>mdi-exit-run</v-icon>
          </v-btn>
      </v-speed-dial>
    </v-card-text>
    <v-overlay :value="overlay" absolute>
      <MessageBoard></MessageBoard>
    </v-overlay>
  </div>

</template>

<script>
import AppGameBoard from "@/components/app/game/AppGameBoard";
import AppPlayersDrawer from "@/components/app/game/AppPlayersDrawer";
import MessageBoard from "@/components/MessageBoard";

export default {
  name: "Index.vue",
  components: {MessageBoard, AppGameBoard, AppPlayersDrawer},
  data() {
    return {
      player: '',
      nowPlayer: '1',
      showNotice: false,
      noticeColor: '',
      notice: '',
      opponent: 'Opponent',
      fab: false,
      overlay: true,
    }
  },
  created() {
    this.player = parseInt(this.$route.query.player);
  },
  methods: {
    observeEndEvent(data) {
      if (data === '1') {
        this.noticeColor = 'cyan darken-2'
        if (this.$store.state.playerNum === '1') {
          this.notice = this.$store.state.username + ' 获胜！'
        } else {
          this.notice = this.$store.state.opponent + ' 获胜！'
        }
      } else if (data === '2') {
        this.noticeColor = 'deep-orange darken-2'
        if (this.$store.state.playerNum === '2') {
          this.notice = this.$store.state.username + ' 获胜！'
        } else {
          this.notice = this.$store.state.opponent + ' 获胜！'
        }
      } else if (data === '3') {
        this.notice = '平局！'
      }

      this.showNotice = true
    },
    observeNowPlayerEvent(data) {
      this.nowPlayer = data
    },
    observeOpponentEvent(data) {
      this.$refs.drawer.setOpponent(data)
    }
  },
}
</script>

<style scoped>

</style>