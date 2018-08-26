<template>
  <div class="wall_hanging__adm">
    <div class="top">
      <h1>企业展厅</h1>
      <el-button type="primary" class="allWake" @click='allWake'>一键唤醒</el-button>
      <el-button type="warning" class='allStandby' @click='allStandby'>恢复待机</el-button>
      <div class="border">
      </div>
    </div>
    <el-row class='down'>
      <el-col :span='12'>
        <div style="padding-bottom: 10px;" v-for="(value, index) in company_items_left" :key='value.id'>
          <span v-text="index+1" :class="[showthisButton_left === index ? 'onlineClick': '', value.online === 1 ? 'online': 'offline']"></span>
          <span class="company_info" @click="showButtonLeft(index)" :class="showthisButton_left === index ? 'company_info_click': ''">logo</span>
          <div class="button_list" v-if="showthisButton_left === index">
            <el-button type="primary" class="button_1" @click='chatMode(value.id, value.online)'>交互模式</el-button><br>
            <el-button type="warning" class='button_2' @click='videoMode(value.id, value.online)'>视频模式</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span='12'>
        <div style="padding-bottom: 10px;text-align: right;" v-for="(value, index) in company_items_right" :key='value.id'>
          <div class="button_list" v-if="showthisButton_right === index">
            <el-button type="primary" class="button_1" @click='chatMode(value.id, value.online)'>交互模式</el-button><br>
            <el-button type="warning" class='button_2' @click='chatMode(value.id, value.online)'>视频模式</el-button>
          </div>
          <span class="company_info" @click="showButtonRight(index)" :class="showthisButton_right === index ? 'company_info_click': ''">logo</span>
          <span style="float: right;margin-left: 10px;" v-text="index+1" :class="[showthisButton_right === index ? 'onlineClick': '', value.online === 1 ? 'online': 'offline']"></span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      showthisButton_left: -1,
      showthisButton_right: -1,
      company_items_left: [],
      company_items_right: []
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
      this.webSocket = new WebSocket('ws://39.105.41.93:8181/renren-fast/websocket/0')
      this.webSocket.onopen = this.wsOpen
      this.webSocket.onmessage = this.wsMessage
      this.webSocket.onclose = this.wsClose
    } else {
      this.$message.error('网络无连接,请连网使用')
    }
    window.addEventListener('online', function () {

    })
    window.addEventListener('offline', function () {

    })
  },
  watch: {
    company_items_left: {
      handler (newValue, oldValue) {

      },
      deep: true,
      immediate: true
    },
    company_items_right: {
      handler (newValue, oldValue) {

      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    wsOpen: function () {
      console.log('连接成功')
    },
    wsMessage: function (evt) {
      let data = JSON.parse(evt.data)
      let _this = this
      data.forEach(function (value, key, array) {
        if (key < 8) {
          Vue.set(_this.company_items_left, key, value)
        } else {
          Vue.set(_this.company_items_right, key - 8, value)
        }
      })
    },
    wsClose: function () {
      console.log('连接关闭')
    },
    allWake: function () {
      let data = {
        device: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        status: 1,
        myDevice: 0
      }
      this.webSocket.send(JSON.stringify(data))
    },
    allStandby: function () {
      let data = {
        device: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        status: 0,
        myDevice: 0
      }
      this.webSocket.send(JSON.stringify(data))
    },
    showButtonLeft: function (index) {
      if (this.showthisButton_left === index) {
        this.showthisButton_left = -1
        this.showthisButton_right = -1
      } else {
        this.showthisButton_left = index
        this.showthisButton_right = -1
      }
    },
    showButtonRight: function (index) {
      if (this.showthisButton_right === index) {
        this.showthisButton_right = -1
        this.showthisButton_left = -1
      } else {
        this.showthisButton_right = index
        this.showthisButton_left = -1
      }
    },
    chatMode: function (id, online) {
      if (online === 1) {
        let data = {
          device: [id],
          status: 2,
          myDevice: 0
        }
        this.webSocket.send(JSON.stringify(data))
      } else {
        this.$message.error('此设备不在线!')
      }
    },
    videoMode: function (id, online) {
      if (online === 1) {
        let data = {
          device: [id],
          status: 1,
          myDevice: 0
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

<style lang="scss" scoped>
.wall_hanging__adm{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.top{
  width: 100%;
  height: 130px;
  text-align: center;
  >h1{
    font-size: 24px;
    margin: 16px 0;
  }
  >.border{
    width: 90%;
    height: 2px;
    background: #C9E0FF;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }
}
.down{
  flex: 1;
  padding: 2% 5% 0 5%;
  background: url(../assets/img/machine_up.png),url(../assets/img/machine_down.png);
  background-repeat: no-repeat;
  background-position: center 70px,center 260px;
  background-size: 150px 150px,150px 150px;
}
.allWake{
  border-radius: 10px;
  font-size: 18px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(255, 126, 22, 1)),to(rgba(229, 102, 0, 1)));
  border: none;
}
.allStandby{
  border-radius: 10px;
  font-size: 18px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(77, 153, 255, 1)),to(rgba(24, 122, 254, 1)));
  border: none;
  margin-left: 30px;
}
.online{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  color: #FFFFFF;
  float: left;
  margin-top: 13px;
  margin-right: 10px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(44, 232, 75, 1)),to(rgba(0, 188, 31, 1)));
}
.onlineClick{
  margin-top: 40px !important;
}
.offline{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  color: #FFFFFF;
  float: left;
  margin-top: 13px;
  margin-right: 10px;
  background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(255, 102, 134, 1)),to(rgba(242, 22, 67, 1)));
}
.company_info{
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: solid 1px #ccc;
  position: relative;
}
.company_info_click{
  width: 70px;
  height: 70px;
  line-height: 70px;
  top: -30px;
}
.button_list{
  display: inline-block;
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
</style>
