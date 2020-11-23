<template>
  <div>
    <v-list
        shaped
        dark
        color="transparent"
    >
      <v-list-item-group
          v-model="nowPlayer"
          color="white"
      >
        <v-list-item
            v-for="player in players"
            :key="player.id"
            link
            disabled
            style="font-size: 13px"
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

  </div>
</template>

<script>
export default {
  name: "AppPlayersDrawer",
  props: ['player', 'nowPlayer'],
  data() {
    return {
      players: [
        {id: 1, name: 'Player 1', icon: 'mdi-panorama-fisheye'},
        {id: 2, name: 'Player 2', icon: 'mdi-close'},
      ],
      opponent: 'Opponent',
    }
  },
  mounted() {
    let p = this.$store.state.playerNum
    if (p === 1) {
      this.players[0].name = this.$store.state.username
      this.players[1].name = this.opponent
    } else if (p === 2) {
      this.players[1].name = this.$store.state.username
      this.players[0].name = this.opponent
    }
  },
  methods:{
    setOpponent(data){
      let p = this.$store.state.playerNum
      if (p === 1) {
        this.players[1].name = data
      } else if (p === 2) {
        this.players[0].name = data
      }
    }
  }
}
</script>

<style scoped>
</style>