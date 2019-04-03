<template>
  <div class="nav_bar">
    <span class="tip">设备连接状态：红色表示离线、绿色表示已连接。</span>
    <div class="user_info">
      <i class="cbiconfont cbicon-yonghu" style="font-size: 26px;"></i>&nbsp;&nbsp;
      {{username}}&nbsp;&nbsp;
      <i class="el-icon-refresh" style="font-size: 26px;cursor: pointer;" @click="refresh"></i>&nbsp;&nbsp;
      <i class="cbiconfont cbicon-tuichu" @click="signout" style="font-size: 26px;"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    const username = this.$cookie.get('username')
    this.username = username
  },
  methods: {
    refresh () {
      this.$router.replace({ name: this.$route.path.slice(1) })
    },
    signout () {
      this.$cookie.delete('username')
      this.$cookie.delete('token')
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_bar{
  background-color: #0067f1;
  height: 100%;
}
.tip{
  padding: 20px;
  line-height: 60px;
  font-size: 16px;
  color: #fff;
}
.user_info{
  height: 100%;
  line-height: 60px;
  display: inline-block;
  color: #FFFFFF;
  font-size: 20px;
  float: right;
}
</style>
