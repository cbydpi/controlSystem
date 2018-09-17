<template>
  <div class="home">
    <div class="ice_screen">
      <span class="ice_screen_logo"></span>
      <span>冰屏</span>
      <span :class="onlineStatus[0].online === 1 ? 'online': 'offline'"></span>
    </div>
    <div class="vertical_adm">
      <span class="vertical_adm_logo"></span>
      <span>立式终端机</span>
      <span :class="onlineStatus[1].online === 1 ? 'online': 'offline'"></span>
    </div>
    <div class="splice_screen">
      <span class="splice_screen_logo"></span>
      <span>拼接屏</span>
      <span :class="onlineStatus[2].online === 1 ? 'online': 'offline'"></span>
    </div>
    <div class="company_display">
      <span class="company_display_logo"></span>
      <span>企业展厅</span>
      <span :class="onlineStatus[3].online === 1 ? 'online': 'offline'" style="position: absolute;top: -12px;left: -60px;"></span>
      <span :class="onlineStatus[4].online === 1 ? 'online': 'offline'" style="position: absolute;top: -12px;left: 127px;"></span>
      <span :class="onlineStatus[5].online === 1 ? 'online': 'offline'" style="position: absolute;top: 16px;left: -60px;"></span>
      <span :class="onlineStatus[6].online === 1 ? 'online': 'offline'" style="position: absolute;top: 16px;left: 127px;"></span>
      <span :class="onlineStatus[7].online === 1 ? 'online': 'offline'" style="position: absolute;top: 44px;left: -60px;"></span>
      <span :class="onlineStatus[8].online === 1 ? 'online': 'offline'" style="position: absolute;top: 44px;left: 127px;"></span>
      <span :class="onlineStatus[9].online === 1 ? 'online': 'offline'" style="position: absolute;top: 72px;left: -60px;"></span>
      <span :class="onlineStatus[10].online === 1 ? 'online': 'offline'" style="position: absolute;top: 72px;left: 127px;"></span>
      <span :class="onlineStatus[11].online === 1 ? 'online': 'offline'" style="position: absolute;top: 100px;left: -60px;"></span>
      <span :class="onlineStatus[12].online === 1 ? 'online': 'offline'" style="position: absolute;top: 100px;left: 127px;"></span>
      <span :class="onlineStatus[13].online === 1 ? 'online': 'offline'" style="position: absolute;top: 128px;left: -60px;"></span>
      <span :class="onlineStatus[14].online === 1 ? 'online': 'offline'" style="position: absolute;top: 128px;left: 127px;"></span>
      <span :class="onlineStatus[15].online === 1 ? 'online': 'offline'" style="position: absolute;top: 156px;left: -60px;"></span>
      <span :class="onlineStatus[16].online === 1 ? 'online': 'offline'" style="position: absolute;top: 156px;left: 127px;"></span>
      <span :class="onlineStatus[17].online === 1 ? 'online': 'offline'" style="position: absolute;top: 184px;left: -60px;"></span>
      <span :class="onlineStatus[18].online === 1 ? 'online': 'offline'" style="position: absolute;top: 184px;left: 127px;"></span>
      <span :class="onlineStatus[19].online === 1 ? 'online': 'offline'" style="position: absolute;top: 212px;left: -60px;"></span>
      <span :class="onlineStatus[19].online === 1 ? 'online': 'offline'" style="position: absolute;top: 212px;left: 127px;"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      webSocket: null,
      onlineStatus: []
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
        this.onlineStatus = JSON.parse(evt.data)
      } else {
        this.$message.success('发送成功')
      }
    },
    wsClose: function () {
      console.log('连接关闭')
    }
  },
  beforeDestroy () {
    this.webSocket.close()
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/main_bg.png);
  background-size: 100% 100%;
}
.online{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  float: right;
  margin-top: 5px;
  margin-left: 5px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(44, 232, 75, 1)),to(rgba(0, 188, 31, 1)));
}
.offline{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  float: right;
  margin-top: 5px;
  margin-left: 5px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(255, 102, 134, 1)),to(rgba(242, 22, 67, 1)));
}
.ice_screen{
  position: absolute;
  top:610px;
  left: 300px;
  font-size: 20px;
  >.ice_screen_logo{
    width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    background: #187afe;
    &::before{
      content: '';
      position: absolute;
      width: 45px;
      height: 50px;
      display: inline-block;
      top: -45px;
      left: -15px;
      background-image: url(../assets/img/ice_screen.png);
      background-size: 100% 100%;
    }
  }
}
.vertical_adm{
  position: absolute;
  top: 280px;
  left: 250px;
  font-size: 20px;
  >.vertical_adm_logo{
    width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    background: #187afe;
    &::before{
      content: '';
      position: absolute;
      width: 45px;
      height: 50px;
      display: inline-block;
      top: -45px;
      left: -15px;
      background-image: url(../assets/img/vertical_adm.png);
      background-size: 100% 100%;
    }
  }
}
.splice_screen{
  position: absolute;
  top: 420px;
  left: 550px;
  font-size: 20px;
  >.splice_screen_logo{
    width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    background: #187afe;
    &::before{
      content: '';
      position: absolute;
      width: 45px;
      height: 50px;
      display: inline-block;
      top: -45px;
      left: -15px;
      background-image: url(../assets/img/splice_screen.png);
      background-size: 100% 100%;
    }
  }
}
.company_display{
  position: absolute;
  top: 130px;
  left: 820px;
  font-size: 20px;
  >.company_display_logo{
    width: 15px;
    height: 15px;
    display: inline-block;
    border-radius: 50%;
    background: #187afe;
    &::before{
      content: '';
      position: absolute;
      width: 45px;
      height: 50px;
      display: inline-block;
      top: -45px;
      left: -15px;
      background-image: url(../assets/img/company_display.png);
      background-size: 100% 100%;
    }
  }
}
</style>
