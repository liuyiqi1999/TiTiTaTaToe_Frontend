<template>
  <div id="app">
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    title: 'TiTiTaTaToe',
    titleTemplate: '%s | TiTiTaTaToe',
    htmlAttrs: {lang: 'en'},
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  created() {
    let screenWidth = document.body.clientWidth
    console.log(screenWidth)
    if(screenWidth > 800){
      this.$store.state.app = false
      this.$router.push('/user')
    }else{
      this.$store.state.app = true
      this.$router.push('/app')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
