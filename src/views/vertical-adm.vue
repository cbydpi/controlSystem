<template>
  <div>
    立式广告机
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  beforeCreate () {
    const token = this.$cookie.get('token')
    if (!token || !/\S/.test(token)) {
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style>
</style>
