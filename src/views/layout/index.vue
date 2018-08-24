<template>
  <div class="main">
    <el-container style='height: 100%;width: 100%;'>
      <el-aside width='220px'>
        <slide-bar></slide-bar>
      </el-aside>
      <el-container>
        <el-header>
          <nav-bar></nav-bar>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import SlideBar from './slide-bar'
import NavBar from './nav-bar'
export default {
  components: {
    SlideBar,
    NavBar
  },
  beforeCreate () {
    const token = this.$cookie.get('token')
    if (!token || !/\S/.test(token)) {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  position: absolute;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
}
.el-header{
  padding: 0 !important;
}
.el-main{
  padding: 0;
  margin: 10px;
  box-shadow: darkgray 0px 0px 15px 4px;
  }
</style>
