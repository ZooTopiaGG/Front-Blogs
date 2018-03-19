<template>
  <div class="signin">
    <div class="box bgbox s-form">
      <div class="logo">
        <img src="../../assets/images/logo2.png">
      </div>
        <el-form class="in-form signin-form " :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item>
          </el-form-item>
          <el-form-item label="姓名/账号">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type='password' v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex flex-pack-justify">
              <p>没有账号？<router-link :to="{ name: 'signup' }">去注册</router-link></p>
              <p><router-link :to="{ name: 'home' }">返回首页</router-link></p>
            </div>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="submitForm()">立即登录</el-button>
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
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        password: ''
      },
      fromSignUp: false,

    }
  },
  beforeRouteEnter (to, from, next) {
     next(vm => {
      // 通过 `vm` 访问组件实例
      // console.log(from)
      // console.log(vm.fromSignUp)
      if (from.path === '/signup' || from.path === '/signin') {
        vm.fromSignUp = true
      }
    })
  },
  methods: {
    submitForm () {
      var that = this;
      // AJAX提交JSON:
      var para = {
          name: that.formLabelAlign.name,
          password: that.formLabelAlign.password
      }
      axios.post('/api/login/', Qs.stringify(para))
      .then(res => {
          let r = JSON.stringify(res.data.result)
          window.localStorage.setItem('55lover_reader', r)
          if (this.fromSignUp) {
            this.$router.push({ path: '/' })
          } else {
            this.$router.go(-1)
          }
          this.$message({
            message: res.data.message,
            type: 'success'
          })
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    $('title').html('登录_邓鹏博客')
    let 
      wHeight = $(window).height()-120,
      bHeight = $('.box').height() + 60;
    if (wHeight < bHeight) {
      $('.signin').height(bHeight)
    } else {
       $('.signin').height(wHeight)
    }
  }
}
</script>
<style type="text/css">
  .signin-form .el-form-item {
    margin-bottom: 0;
  }
  .signin-form .el-form-item__label {
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
