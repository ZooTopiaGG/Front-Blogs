<template>
  <div class="signin">
    <div class="box bgbox s-form">
      <div class="logo">
        <img src="../../assets/images/logo2.png">
      </div>
        <el-form class="in-form signup-form" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item>
          </el-form-item>
          <el-form-item label="姓名/账号">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formLabelAlign.email"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="formLabelAlign.gender"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type='password' v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type='password' v-model="formLabelAlign.password1"></el-input>
          </el-form-item>
          <el-form-item>
            <p>我有账号了。<router-link :to="{ name: 'signin' }">直接去登录</router-link></p>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="submitForm()">注册</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      name: '',
      password: '',
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        password1: '',
        password: '',
        gender: '',
        email: ''
      }
    }
  },
  methods: {
    submitForm () {
      var that = this;
      // AJAX提交JSON:
      var para = {
          name: that.formLabelAlign.name,
          password: that.formLabelAlign.password,
          password1: that.formLabelAlign.password1,
          gender: that.formLabelAlign.gender,
          email: that.formLabelAlign.email,
      }
      axios.post('/api/signup/', Qs.stringify(para))
      .then(res => {
          console.log(res)
          if (res.data.isSuc) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    $('title').html('注册_邓鹏博客')
    $('.signin').height($(window).height()-120)
  }
}
</script>
<style type="text/css">
  .signup-form .el-form-item {
    margin-bottom: 0;
  }
  .signup-form .el-form-item__label {
    color: #444
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signin{
  box-sizing: border-box;
}
.box {
  width: 400px;
}
.s-form{
  margin: 0 auto;
}
.logo{
  text-align: center;
}
.logo img{
  height: 70px;
  overflow: hidden;
}
.box h3 {
  font-size: 42px;
  text-align: center;
  color: #333;
}
.in-form .el-button--primary{
  width: 100%
}
</style>
