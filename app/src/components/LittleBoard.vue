<template>
  <v-card class="little-board" :disabled="disabled">
    <v-row style="height: 160px; ">
      <v-col
          v-for="n in 9"
          :key="n"
          class="d-flex child-flex"
          cols="4"
          style="padding: 0px"
          @mouseenter="setButtonType(n-1)"
          @mouseleave="clearButtonType(n-1)"
      >
        <little-button
            ref="button"
            :button-num = "n-1"
            @select-event="observeSelectEvent"
        ></little-button>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import LittleButton from "@/components/LittleButton";

export default {
  name: "LittleBoard",
  components: {LittleButton},
  props: ['boardNum'],
  data() {
    return {
      nextButtonCircle: false,
      disabled: true,
    }
  },
  methods: {
    observeSelectEvent(data) {
      if(this.disabled) return
      this.$emit("move-event", {buttonNum: data, boardNum: this.boardNum})
    },
    setButtonType(n) {
      if(this.disabled) return
      if (this.nextButtonCircle) {
        this.$refs.button[n].setButtonCircle()
      } else {
        this.$refs.button[n].setButtonCross()
      }
    },
    clearButtonType(n){
      if(this.disabled) return
      if(!this.selected){
        this.$refs.button[n].setButtonDefault()
      }
    },
    setDisabled(disabled){
      this.disabled = disabled
    },
    setNextButtonCircle(circle){
      console.log(circle)
      this.nextButtonCircle = circle
    },
    setBoard(boardArray){
      for(let i=0;i<boardArray.length;i++){
        this.$refs.button[i].setSelected(false)
        if(boardArray[i]==='1'){
          this.$refs.button[i].setButtonCircle()
          this.$refs.button[i].setSelected(true)
        }else if(boardArray[i]==='2'){
          this.$refs.button[i].setButtonCross()
          this.$refs.button[i].setSelected(true)
        }else if(boardArray[i]==='0'){
          this.$refs.button[i].setButtonDefault()
        }
      }
    }
  }
}
</script>

<style scoped>
.little-board {
  width: 160px;
  height: 160px;
  background: #2f2f2f;
  padding: 2px 15px 10px 15px;
}
</style>