<template>
  <div class='bg_b'>
    <div class="bg_s">
      <p class="header_top">新材料智慧展厅中控系统</p>
      <div class="form_style">
        <el-form ref='form' :model='form' label-width='80px' size='medium' :rules='rules'>
          <el-form-item label='用户名：' prop='username'>
            <el-input v-model='form.username' placeholder='请输入你的用户名' @keyup.enter.native='submit()' clearable>
              <i slot='prefix' class="cbiconfont cbicon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label='密码：' prop='password'>
            <el-input v-model='form.password' placeholder='请输入密码' @keyup.enter.native='submit()' clearable>
              <i slot='prefix' class="cbiconfont cbicon-password"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click='submit'>登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p class="header_bottom">济南新材料产业园区&nbsp;&nbsp;&nbsp;&nbsp;版权所有</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var formData = new FormData()
          formData.append('username', this.form.username)
          formData.append('password', this.form.password)
          this.$http.post(this.URL + 'sys/login', formData).then(
            function (res) {
              if (res.body.code === 0) {
                this.$cookie.set('token', res.body.token, 0.001)
                this.$cookie.set('username', this.form.username, 0.001)
                this.$router.push({path: '/home'})
              } else {
                this.$message.error(res.body.msg)
              }
            }, function (res) {
            // 处理失败的结果
            }
          )
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg_b{
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url(../assets/img/login_bg_b.png);
    >.bg_s{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 500px;
      height: 400px;
      margin: auto;
      background: url(../assets/img/login_bg_s.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      >.header_top{
        margin-top: -70px;
        text-align: center;
        color: #fff;
        font-size: 44px;
        background-image: -webkit-gradient(linear,0 0,0 bottom, from(rgba(202,239,255,1)),to(rgba(255, 255, 255, 1)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      >.header_bottom{
        text-align: center;
        color: #FFFFFF;
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
      }
      >.form_style{
        width: 330px;
        margin: 155px 80px;
      }
    }
  }
  .el-input__inner{
    border: solid 1px #e2e2e2;
    border-radius: 3px;
    height: 40px !important;
    line-height: 40px !important;
  }
</style>
