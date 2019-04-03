<template>
  <div class="slide_bar">
    <el-menu
      :default-active='this.$route.path'
      style="height:100%;text-align: center;overflow: hidden;"
      background-color="#187afe"
      text-color="#fff"
      active-text-color='#fff'
      active-color="#0057cc"
      :router="true">
      <div class="logo">
        <p class="logo_text">
          <span class="cn">济南新材料产业园区</span><br>
          <span class="en">JINAN NEW MATERIALS INDUSTRY ZONE</span>
        </p>
      </div>
      <el-menu-item index="/home">
        <span slot="title" style="font-size: 24px;">全景</span>
        <i class="el-icon-arrow-right nav-right"></i>
      </el-menu-item>
      <el-menu-item index="/ice-screen">
        <span slot="title" style="font-size: 24px;">迎宾屏</span>
        <i class="el-icon-arrow-right nav-right"></i>
      </el-menu-item>
      <el-menu-item index="/ice">
        <span slot="title" style="font-size: 24px;">冰屏</span>
        <i class="el-icon-arrow-right nav-right"></i>
      </el-menu-item>
      <el-menu-item index="/vertical-adm">
        <span slot="title" style="font-size: 24px;">立式终端机</span>
        <i class="el-icon-arrow-right nav-right"></i>
      </el-menu-item>
      <el-menu-item index="/protrait">
        <span slot="title" style="font-size: 24px;">画像屏</span>
        <i class="el-icon-arrow-right nav-right"></i>
      </el-menu-item>
      <el-menu-item index="/splice-screen">
        <span slot="title" style="font-size: 24px;">拼接屏</span>
        <i class="el-icon-arrow-right nav-right"></i>
      </el-menu-item>
      <el-menu-item index="/wall-hanging-adm">
        <span slot="title" style="font-size: 24px;">企业展区</span>
        <i class="el-icon-arrow-right nav-right"></i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped="scoped">
.slide_bar{
  height: 100%;
}
.el-menu{
  border: none;
}
.el-menu-item{
  height: 60px !important;
  line-height: 60px !important;
}
.logo{
  width: 220px;
  height: 200px;
  background-image: url(../../assets/img/logo.png);
  background-size: 110px 110px;
  background-repeat: no-repeat;
  background-position: 45px 0px;
   span{
    color: #FFFFFF;
  }
  .logo_text{
    position: relative;
    top: 130px;
    text-align: center;
  }
  .cn{
    border-bottom: solid 1px rgba(255,255,255,.5);
    font-size: 16px;
  }
  .en{
    font-size: 10px;
  }
}
.nav-right{
  color: #fff;
  font-size: 24px;
  position: absolute;
  right: 0;
  line-height: 60px;
}
.is-active{
  background-color: #0057cc !important;
}

</style>
