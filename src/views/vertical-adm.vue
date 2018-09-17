<template>
  <div class="vertical_adm">
    <div class="vertical_adm_main">
      <span :class="onlineStatus === 1 ? 'online': 'offline'"></span>
      <p class="vertical_adm_real"></p>
      <div style="text-align: center;display: inline-block;float: right;margin-top: 40px;">
        <span style="font-size: 24px;float: left;margin-top: 50px;margin-left: 30px;margin-right: 20px;margin-bottom: 50px;">立式终端机</span>
        <span class="current_mode">{{currentMode}}</span>
        <el-button type="primary" class="button_1" @click='standbyMode'>待机模式</el-button><br>
        <el-button type="warning" class='button_2' @click='videoMode'>视频模式</el-button><br />
        <el-button type="warning" class='button_3' @click='chatMode'>交互模式</el-button>
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
        this.onlineStatus = JSON.parse(evt.data)[1].online
        if (JSON.parse(evt.data)[1].status === 0 && this.onlineStatus === 1) {
          this.currentMode = '待机模式'
        } else if (JSON.parse(evt.data)[1].status === 1 && this.onlineStatus === 1) {
          this.currentMode = '视频模式'
        } else if (JSON.parse(evt.data)[1].status === 2 && this.onlineStatus === 1) {
          this.currentMode = '交互模式'
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
          deviceId: [2],
          status: 0,
          myDevice: 0
        }
        console.log(data)
        this.webSocket.send(JSON.stringify(data))
      } else {
        this.$message.error('此设备不在线!')
      }
    },
    videoMode: function () {
      if (this.onlineStatus === 1) {
        let data = {
          deviceId: [2],
          status: 1,
          myDevice: 0
        }
        console.log(data)
        this.webSocket.send(JSON.stringify(data))
      } else {
        this.$message.error('此设备不在线!')
      }
    },
    chatMode: function () {
      if (this.onlineStatus === 1) {
        let data = {
          deviceId: [2],
          status: 2,
          myDevice: 0
        }
        console.log(data)
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

<style lang="scss" scoped>
.vertical_adm{
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/vertical_adm_bg.png);
  background-size: 100% 100%;
  >.vertical_adm_main{
    position: absolute;
    top: 270px;
    left: 370px;
    >.vertical_adm_real{
      width: 70px;
      height: 140px;
      background: url(../assets/img/vertical_adm_real.png);
      background-size: 100% 100%;
      display: inline-block;
    }
  }
}
.online{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  margin-top: 15px;
  margin-left: 85px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(44, 232, 75, 1)),to(rgba(0, 188, 31, 1)));
}
.offline{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  margin-top: 15px;
  margin-left: 85px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(255, 102, 134, 1)),to(rgba(242, 22, 67, 1)));
}
.button_1{
  border-radius: 10px;
  font-size: 18px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(77, 153, 255, 1)),to(rgba(24, 122, 254, 1)));
  border: none;
  margin-left: 0px;
  margin-top: -20px;
}
.button_2{
  margin-top: 10px;
  border-radius: 10px;
  font-size: 18px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(255, 217, 30, 1)),to(rgba(255, 160, 30, 1)));
  border: none;
}
.button_3{
  border-radius: 10px;
  font-size: 18px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(255, 126, 22, 1)),to(rgba(229, 102, 0, 1)));
  border: none;

  margin-top: 10px;
}
.current_mode{
  position: absolute;
  color: #fff;
  font-size: 24px;
  top: 28px;
  left: 25px;
  z-index: 11;
  display: inline-block;
  width: 20px;
  line-height: 28px;
}
</style>
