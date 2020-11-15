<template>
  <div>
    <v-snackbar
        v-model="showNotice"
        top
        dark
        elevation="8"
        :color="noticeColor"
        style="margin-top: -80px"
    >
      {{ notice }}
    </v-snackbar>
    <v-row>
      <v-col
          v-for="n in 9"
          :key="n"
          class="d-flex child-flex"
          cols="4"
      >
        <little-board
            ref="boards"
            :board-num="n-1"
            @move-event="observeMoveEvent"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LittleBoard from "@/components/LittleBoard";

export default {
  name: "GameBoard",
  components: {LittleBoard},
  props: ['player'],
  data() {
    return {
      nextButtonCircle: true,
      nextBoard: 4,
      showNotice: false,
      noticeColor: '',
      notice: '',
      message: '',
      time: 0,
    }
  },
  mounted() {
    let that = this

    let initStr = new Array(81).fill(0).toString().replace(/,/g, "")
    initStr = '1' + initStr + '43'
    let initArray = [3, 1, initStr]
    this.setChess(initArray)
    this.$store.state.connection.onmessage = function (event) {
      console.log(event.data)
      that.message = event.data
      let i = event.data.split(" ")[0]
      let j = event.data.split(" ")[1]
      if (i === '3') {
        if (j === '1') {
          that.time++

          let str = event.data.split(" ")[2]
          let winner = '0'
          console.log(str[83])
          if(str[83]==='0'){
            that.setChess(event.data.split(" "))
          }else if(str[83]==='1'){
            winner = '1'
          }else if(str[83]==='2'){
            winner = '2'
          }else if(str[83]==='3'){
            winner = '3'
          }

          if(winner!=='0') {
            that.$emit('end-event',winner)
            for(let i=0;i<that.$refs.boards.length;i++){
              this.$refs.boards[i].setDisabled(true)
            }
          }

        } else if (j === '0') {
          that.noticeColor = 'red'
          that.notice = event.data.split(" ")[2]
          that.showNotice = true
        }
      }
    }
  },
  methods: {
    setChess(data) {
      if (data[2][0] === '0') this.nextButtonCircle = false
      else if (data[2][0] === '1') this.nextButtonCircle = true
      let gameBoardStr = data[2].substring(1, 82)
      this.nextBoard = data[2][82]
      let nowPlayer = this.time % 2
      this.$emit('now-player-event',nowPlayer)
      for (let i = 0; i < 9; i++) {
        let littleBoardArray = gameBoardStr.substring(i * 9, i * 9 + 9).split('')
        this.$refs.boards[i].setBoard(littleBoardArray)
        this.$refs.boards[i].setNextButtonCircle(this.nextButtonCircle)
        if (i === parseInt(this.nextBoard) && nowPlayer === this.player) {
          this.$refs.boards[i].setDisabled(false)
        } else {
          this.$refs.boards[i].setDisabled(true)
        }
      }
    },
    observeMoveEvent(data) {
      let buttonNum = data.buttonNum
      let boardNum = data.boardNum
      this.$store.state.connection.send('1 ' + boardNum.toString() + Math.floor((buttonNum / 3)).toString() + (buttonNum % 3).toString() + '\n')
    }
  }
}
</script>

<style scoped>

</style>