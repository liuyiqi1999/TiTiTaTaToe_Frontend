<template>
  <div style="color: whitesmoke">
    <div>
      <v-snackbar
          v-model="showNotice"
          top
          dark
          elevation="8"
          :color="noticeColor"
          style="margin-top: -80px;"
      >
        {{ notice }}
      </v-snackbar>
    </div>
    <div style="margin-top: 50px">
      <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
      ></v-progress-circular>
      <v-icon
          v-if="success"
          dark
          right
          x-large
      >
        mdi-checkbox-marked-circle
      </v-icon>
      <v-icon
          v-if="fail"
          dark
          right
          x-large
      >
        mdi-cancel
      </v-icon>
      <p style="font-size:20px; margin-top: 20px">{{ loadingStr }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Connection',
  data() {
    return {
      loadingStr: '正在连接服务器……',
      showNotice: false,
      noticeColor: '',
      notice: '',
      message: '',
      loading: true,
      success: false,
      fail: false,
    }
  },
  created(){
    let that = this
    this.$store.commit('connect')
    this.$store.state.connection.onmessage = function (event) {
      that.message = event.data
      let i = event.data.split(" ")[0]
      if(i==='1') that.loadingStr = '正在等待对手加入……'
      else if(i==='2') {
        let p = parseInt(event.data.split(" ")[2])+1
        that.loadingStr = '游戏即将开始，你是 Player '+p+'。'
        that.loading = false
        that.success = true
        that.$router.push({
          name: 'Game',
          query: {
            player: event.data.split(" ")[2]
          }
        })
      }
    }

    this.$store.state.connection.onopen = function () {
      that.noticeColor = 'success'
      that.notice = '成功连接游戏服务器'
      that.showNotice = true
    }

    this.$store.state.connection.onclose = function () {
      that.noticeColor = 'red'
      that.notice = '与服务器的连接关闭'
      that.showNotice = true
      that.loadingStr = '与服务器断开连接，正在尝试重连……'
      that.loading = true
      that.success = false
    }
  }
}
</script>

<style scoped>

</style>