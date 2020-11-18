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
    <div style="margin-top: 10px">
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
        mdi-account-multiple-check-outline
      </v-icon>
      <v-icon
          v-if="input"
          dark
          right
          x-large
      >
        mdi-account-edit
      </v-icon>
      <v-icon
          v-if="matching"
          dark
          right
          x-large
      >
        mdi-account-multiple
      </v-icon>
      <v-icon
          v-if="fail"
          dark
          right
          x-large
      >
        mdi-cancel
      </v-icon>
      <p style="font-size: 15px; color: dimgrey; margin-top: 15px" v-if="matching">用户名：{{ username }}</p>
      <p style="font-size:20px; margin-top: 20px">{{ loadingStr }}</p>
      <v-text-field
          v-if="input"
          label="用户名"
          v-model="username"
          dark
          outlined
          style="margin-top: 40px"
      ></v-text-field>
      <v-btn
          v-if="input"
          class="mx-2"
          fab
          dark
          small
          color="cyan"
          @click="sendUsername"
      >
        <v-icon dark>
          mdi-arrow-right
        </v-icon>
      </v-btn>
      <v-list v-if="inviters.length>0" dark style="margin:20px 0px 35px 0">
        <v-subheader>邀请</v-subheader>
        <v-list-item-group
            v-model="inviters"
        >
          <v-list-item
              v-for="(inviter, i) in inviters"
              :key="i"
              inactive
          >
            <v-row>
              <v-col cols="2">
                <v-icon>mdi-message-plus-outline</v-icon>
              </v-col>
              <v-col cols="6" style="text-align: left">
                {{ inviter }}
              </v-col>
              <v-col cols="2">
                <v-icon @click.prevent="acceptInvitation(inviter,i)" color="cyan">
                  mdi-handshake
                </v-icon>
              </v-col>
              <v-col cols="2">
                <v-icon @click.prevent="refuseInvitation(inviter,i)" color="deep-orange">
                  mdi-account-cancel
                </v-icon>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list-item-group>

      </v-list>
      <v-list v-if="matching" dark style="margin:20px 0px 35px 0">
        <v-subheader>在线用户列表</v-subheader>
        <v-list-item-group
            v-model="users"
        >
          <v-list-item
              ref="useritems"
              v-for="(user, i) in users"
              :key="i"
              @click.prevent="invite(i)"
          >
            <v-row style="margin-right: 10px">
              <v-col cols="2">
                <v-icon>mdi-account-cowboy-hat</v-icon>
              </v-col>
              <v-col cols="9" style="text-align: left">
                {{ user }}
              </v-col>
              <v-col cols="1">
                <v-icon>
                  mdi-hand-pointing-left
                </v-icon>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item
              v-if="users && users.length<=0"
              disabled
          >
            <v-row style="margin-right: 10px">
              <v-col cols="2">
                <v-icon>mdi-account-alert-outline</v-icon>
              </v-col>
              <v-col cols="10" style="text-align: left">
                当前没有其他玩家在线
              </v-col>
            </v-row>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-btn
          v-if="matching"
          class="mx-2"
          fab
          dark
          small
          color="cyan"
          @click="refreshUserlist"
      >
        <v-icon dark>
          mdi-refresh
        </v-icon>
      </v-btn>
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
      input: false,
      matching: true,
      fail: false,
      username: '',
      users: [],
      inviters: [],
    }
  },
  methods: {
    sendUsername() {
      this.$store.state.connection.send('5 ' + this.username + "\n");
      this.$store.state.username = this.username
    },
    refreshUserlist() {
      this.$store.state.connection.send('2\n')
    },
    invite(i) {
      let name = this.users[i]
      this.$store.state.connection.send('3 ' + name + '\n')
      this.refreshUserlist()

      this.noticeColor = 'success'
      this.notice = '邀请已发送'
      this.showNotice = true
    },
    acceptInvitation(inviter, i) {
      this.$store.state.connection.send('4 1 ' + inviter + '\n')
      this.inviters.splice(i, 1)
    },
    refuseInvitation(inviter, i) {
      this.$store.state.connection.send('4 0 ' + inviter + '\n')
      this.inviters.splice(i, 1)
    }
  },
  created() {
    let that = this
    this.$store.commit('connect')
    this.$store.state.connection.onmessage = function (event) {
      that.message = event.data
      console.log(event.data)
      let i = event.data.split(" ")[0]
      if (i === '1') {
        that.loadingStr = '请输入用户名'
        that.loading = false
        that.input = true
        that.matching = false
        that.success = false
      } else if (i === '2') {
        let p = parseInt(event.data.split(" ")[2]) + 1
        that.$store.state.playerNum = p
        that.loadingStr = '游戏即将开始，你是 Player ' + p + '。'
        that.loading = false
        that.input = false
        that.matching = false
        that.success = true
        that.$store.state.connection.send("7\n")
        that.$router.push({
          name: 'Game',
          query: {
            player: event.data.split(" ")[2]
          }
        })
      } else if (i === '5') {
        if (event.data.split(" ")[1] === '1') {
          let name = event.data.split(" ")[2]
          that.noticeColor = 'success'
          that.notice = name + '已接受你的邀请'
          that.showNotice = true
        } else if (event.data.split(" ")[1] === '0') {
          that.noticeColor = 'red'
          that.notice = event.data.split(" ")[2]
          that.showNotice = true
        }
      } else if (i === '6') {
        if (event.data.split(" ")[1] === '1') {
          let inviterName = event.data.split(" ")[2]
          that.inviters.push(inviterName)
        }
      } else if (i === '7') {
        that.users = event.data.split(" ")[2].split(",")
        if (that.users) {
          that.users = that.users.slice(0, that.users.length - 1)
          for (let j = 0; j < that.users.length; j++) {
            if (that.users[j] === that.$store.state.username) {
              that.users.splice(j, 1)
            }
          }
        }
      } else if (i === '8') {
        let ior = event.data.split(" ")[2][0]
        let iorStr = ''
        if (ior === '1') {
          iorStr = '接受'
        } else if (ior === '0') {
          iorStr = '拒绝'
        }
        let name = event.data.split(" ")[2].substring(1)

        if (event.data.split(" ")[1] === '1') {
          that.noticeColor = 'success'
          that.notice = iorStr + " " + name + " 已成功"
          that.showNotice = true
        } else if (event.data.split(" ")[1] === '0') {
          that.noticeColor = 'red'
          that.notice = iorStr + " " + name + " 失败"
          that.showNotice = true
        }
      } else if (i === '9') {
        if (event.data.split(" ")[1] === '1') {
          that.noticeColor = 'success'
          that.notice = '设置用户名成功'
          that.showNotice = true

          that.loadingStr = '选择对手或等待邀请'
          that.loading = false
          that.input = false
          that.matching = true
          that.success = false

          that.$store.state.connection.send('2\n')
        } else if (event.data.split(" ")[1] === '0') {
          that.noticeColor = 'red'
          that.notice = event.data.split(" ").slice(2).join(" ")
          that.showNotice = true
        }
      } else if (i === '11') {
        if (event.data.split(" ")[1] === '1') {
          that.$store.state.opponent = event.data.split(" ")[2]
        }
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
      that.input = false
      that.matching = false
    }
  },
}
</script>

<style scoped>

</style>