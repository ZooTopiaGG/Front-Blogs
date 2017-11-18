<template>
  <div class="signin">
    <div class="box">
      <div class="logo">
        <img alt="dengpeng" src="../../assets/images/73068c09df2142dfbcd926b6c4056dc6.png">
      </div>
        <el-form class="in-form" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item>
          </el-form-item>
          <el-form-item label="姓名/账号">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type='password' v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item>
            <p>没有账号？<router-link :to="{ name: 'signup' }">去注册</router-link></p>
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
      }
    }
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
          this.$router.go(-1)
          this.$message({
            message: res.data.message,
            type: 'success'
          })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signin{
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: #efefef
}
.box {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -350px;
}
.logo{
  text-align: center;
  margin-bottom: 36px;
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
