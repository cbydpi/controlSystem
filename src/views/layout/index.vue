<template>
  <div>
    <slide-bar></slide-bar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SlideBar from './slide-bar'

export default {
  components: {
    SlideBar
  }
}
</script>

<style>
</style>
