<template>
  <div class="ice_screen">
    <div class="ice_screen_main">
      <span :class="onlineStatus === 1 ? 'online': 'offline'"></span>
      <p class="ice_screen_real"></p>
      <div style="text-align: center;">
        <span style="font-size: 24px;float: left;margin-top: 40px;margin-left: 50px;">冰屏</span>
        <span class="current_mode">{{currentMode}}</span>
        <el-button type="primary" class="button_1" @click='standbyMode'>待机模式</el-button><br>
        <el-button type="warning" class='button_2' @click='videoMode'>视频模式</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      webSocket: null,
      onlineStatus: null,
      currentMode: ''
    }
  },
  beforeCreate () {
    const token = this.$cookie.get('token')
    if (!token || !/\S/.test(token)) {
      this.$router.push({path: '/login'})
    }
  },
  created () {
    if (navigator.onLine) {
      this.webSocket = new WebSocket(this.wsURL + 'websocket/0')
      this.webSocket.onopen = this.wsOpen
      this.webSocket.onmessage = this.wsMessage
      this.webSocket.onclose = this.wsClose
    } else {
      this.$message.error('网络无连接,请连网使用')
    }
  },
  methods: {
    wsOpen: function () {
      console.log('连接成功')
    },
    wsMessage: function (evt) {
      if (JSON.parse(evt.data).code === undefined) {
        this.onlineStatus = JSON.parse(evt.data)[0].online
        if (JSON.parse(evt.data)[0].status === 0 && this.onlineStatus === 1) {
          this.currentMode = '待机模式'
        } else if (JSON.parse(evt.data)[0].status === 1 && this.onlineStatus === 1) {
          this.currentMode = '视频模式'
        }
      } else {
        this.$message.success('发送成功')
      }
    },
    wsClose: function () {
      console.log('连接关闭')
    },
    standbyMode: function () {
      if (this.onlineStatus === 1) {
        let data = {
          deviceId: [1],
          status: 0,
          myDevice: 0,
          code: 666
        }
        this.webSocket.send(JSON.stringify(data))
      } else {
        this.$message.error('此设备不在线!')
      }
    },
    videoMode: function () {
      if (this.onlineStatus === 1) {
        let data = {
          deviceId: [1],
          status: 1,
          myDevice: 0,
          code: 666
        }
        this.webSocket.send(JSON.stringify(data))
      } else {
        this.$message.error('此设备不在线!')
      }
    }
  },
  beforeDestroy () {
    this.webSocket.close()
  }
}
</script>

<style scoped lang="scss">
.ice_screen{
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/ice_screen_bg.png);
  background-size: 100% 100%;
  >.ice_screen_main{
    position: absolute;
    top: 250px;
    left: 290px;
    >.ice_screen_real{
      width: 300px;
      height: 60px;
      background: url(../assets/img/ice_screen_real.png);
      background-size: 100% 100%;
    }
  }
}
.online{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  float: right;
  margin-top: -10px;
  margin-left: 5px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(44, 232, 75, 1)),to(rgba(0, 188, 31, 1)));
}
.offline{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  float: right;
  margin-top: -10px;
  margin-left: 5px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(255, 102, 134, 1)),to(rgba(242, 22, 67, 1)));
}
.button_1{
  border-radius: 10px;
  font-size: 18px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(77, 153, 255, 1)),to(rgba(24, 122, 254, 1)));
  border: none;
}
.button_2{
  margin-top: 18px;
  border-radius: 10px;
  font-size: 18px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(255, 217, 30, 1)),to(rgba(255, 160, 30, 1)));
  border: none;
}
.current_mode{
  position: absolute;
  color: #FFFFFF;
  font-size: 24px;
  top: 28px;
  left: 100px;
  z-index: 11;
}
</style>
