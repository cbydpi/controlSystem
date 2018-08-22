<template>
  <div class='bg_b'>
    <div class="bg_s">
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
  .bg_b{
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url('../../static/img/login_bg_b.png');
    >.bg_s{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 800px;
      height: 550px;
      margin: auto;
      background-image: url(../../static/img/login_bg_s.png);
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
</style>
