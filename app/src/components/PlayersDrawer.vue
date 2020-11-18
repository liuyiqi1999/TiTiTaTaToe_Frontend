<template>
  <v-card
      elevation="12"
      width="256"
  >
    <v-navigation-drawer
        floating
        permanent
        dark
    >
      <v-list
          shaped
      >
        <v-subheader>{{$store.state.username}}</v-subheader>
        <v-list-item-group
          v-model="nowPlayer"
          color="white"
        >
          <v-list-item
              v-for="player in players"
              :key="player.id"
              link
              disabled
          >
            <v-list-item-icon>
              <v-icon>{{ player.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-html="player.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <p style="color:gray; font-size: 11px; text-align: left; padding: 10px">
        游戏规则：大棋盘由3×3个标准3×3井字棋棋盘组成，上位玩家在其中一个小棋盘上落子后，下位玩家必须在大棋盘上对应位置的小棋盘落子。<br>
        当其中一方玩家赢下任意一个小棋盘（小棋盘获胜规则同普通井字棋）即视为获胜。<br>
      </p>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "PlayersDrawer",
  props: ['player'],
  data(){
    return{
      players: [
        { id:1, name: 'Player 1', icon: 'mdi-panorama-fisheye'},
        { id:2, name: 'Player 2', icon: 'mdi-close'},
      ],
      nowPlayer: '1',
    }
  },
  created(){
    let p = this.$store.state.playerNum
    if(p===1){
      this.players[0].name = this.$store.state.username
      this.players[1].name = this.$store.state.opponent
    }else if (p===2){
      this.players[1].name = this.$store.state.username
      this.players[0].name = this.$store.state.opponent
    }
  }
}
</script>

<style scoped>
</style>