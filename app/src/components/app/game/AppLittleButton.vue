<template>
  <div>
    <v-btn
        v-if="circle"
        class="mx-2 button"
        fab
        depressed
        color="cyan darken-4"
        @click="request"
    >
      <v-icon style="width: 16px;height:16px; color: #44ffcd;">
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
      <v-icon style="width: 16px;height:16px; color: #ffac92;">
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
  </div>
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
  width: 18px !important;
  height: 18px !important;
  margin: 0px !important;
  padding: 0px !important;
}
</style>