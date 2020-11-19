<template>
  <v-card class="little-board d-flex justify-center align-center" :disabled="disabled" :elevation="elevation">
    <v-row style="height: 100px; width: 100px; padding: 0">
      <v-col
          v-for="n in 9"
          :key="n"
          class="d-flex child-flex"
          cols="4"
          style="padding: 0 5px!important;width: 20px;"
          @mouseenter="setButtonType(n-1)"
          @mouseleave="clearButtonType(n-1)"
      >
        <app-little-button
            ref="button"
            :button-num = "n-1"
            @select-event="observeSelectEvent"
        ></app-little-button>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AppLittleButton from "@/components/app/game/AppLittleButton";

export default {
  name: "AppLittleBoard",
  components: {AppLittleButton},
  props: ['boardNum','app'],
  data() {
    return {
      nextButtonCircle: false,
      disabled: true,
      elevation: 0,
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
      if(disabled) this.elevation = 0
      else this.elevation = 20
    },
    setNextButtonCircle(circle){
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
  width: 100px;
  height: 100px;
  background: #2f2f2f;
  padding: 15px 10px 10px;
}
</style>