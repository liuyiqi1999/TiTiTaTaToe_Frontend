<template>
  <v-btn
      v-if="circle"
      class="mx-2 button"
      fab
      depressed
      color="cyan darken-4"
      @click="request"
  >
    <v-icon style="width: 20px; color: #44ffcd">
      mdi-panorama-fisheye
    </v-icon>
  </v-btn>
  <v-btn
      v-else-if="cross"
      class="mx-2 button"
      fab
      depressed
      color="deep-orange darken-3"
      @click="request"
  >
    <v-icon style="width: 20px; color: #ffac92">
      mdi-close
    </v-icon>
  </v-btn>
  <v-btn
      v-else
      class="mx-2 button"
      fab
      depressed
      color="grey darken-3"
      @click="request"
  >
  </v-btn>
</template>

<script>
export default {
  name: "LittleButton",
  props: ['buttonNum'],
  data() {
    return {
      circle: false,
      cross: false,
      selected: false,
    }
  },
  methods: {
    setButtonCircle() {
      if(!this.selected){
        this.circle = true
        this.cross = false
      }
    },
    setButtonCross() {
      if(!this.selected){
        this.circle = false
        this.cross = true
      }
    },
    setButtonDefault(){
      if(!this.selected){
        this.circle = false
        this.cross = false
      }
    },
    request() {
      this.$emit('select-event',this.buttonNum)
      this.selected = true
    },
    setSelected(selected){
      this.selected = selected
    }
  }
}
</script>

<style scoped>
.button {
  width: 30px !important;
  height: 30px !important;
  margin: 9px !important;
  padding: 0px !important;
}
</style>