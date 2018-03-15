<template>
  <footer :class="[{footers: true}, {music: GET_PLAY_STATUS}]" v-show="GET_FOOTER_SHOW">
    <div class="footer-top">
      <div class="flex footer-info flex-pack-justify">
        <!-- 底部一 友情链接 -->
        <div class="friends-link flex flex-v second-box">
          <div class="footer-title flex flex-align-center">
            <icon name="users" scale="1.2" style="color:#fff"></icon>
            <span class="title-text">友情链接</span>
            <span class="title-label">Friends links</span>
          </div>
          <span class="link-addr"><a href="http://www.lawyer-center.com" class="flex flex-align-center" target="_blank"><span class="link-label bgred">1</span><span class="link-title">律师说官方网站</span></a></span>
          <span class="link-addr"><a href="http://www.liaoxuefeng.com" target="_blank" class="flex flex-align-center"><span class="link-label bggreen">2</span><span class="link-title">廖雪峰官方网站</span></a></span>
         <!--  <span class="link-addr"><a href="http://www.100txy.com" class="flex flex-align-center" target="_blank"><span class="link-label bgorange">3</span><span class="link-title">雷小天博客</span></a></span> -->
        </div>
        <!-- 底部二 申请友情链接 -->
        <div class="apply-friends second-box">
          <div class=" footer-title flex flex-align-center">
            <icon name="user-plus" scale="1.2" style="color:#fff"></icon>
            <span class="title-text">申请友链</span>
            <span class="title-label">Apply links</span>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="网站名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="您的邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="您的网站" prop="website">
              <el-input v-model="ruleForm.website"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 底部三 数据统计 -->
        <div class="datas flex flex-v second-box">
          <div class="footer-title flex flex-align-center">
            <icon name="crosshairs" scale="1.2" style="color:#fff"></icon>
            <span class="title-text">站长统计</span>
            <span class="title-label">Webmaster statistics</span>
          </div>
          <div class="flex flex-pack-justify">
            <div class="datas1 flex flex-v flex-pack-center">
              <div class="flex flex-align-center datas-label">
                <icon name="image" scale="1.0" style="color:#fff"></icon><span class="datas-title">图片数量：</span><span>40张</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <icon name="bookmark" scale="1.0" style="color:#fff; width:16px;"></icon><span class="datas-title">动态数量：</span><span>{{GET_STAT.dynamic_num}}条</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <icon name="th" scale="1.0" style="color:#fff"></icon><span class="datas-title">文章数量：</span><span>{{GET_STAT.article_num}}篇</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <icon name="comment" scale="1.0" style="color:#fff"></icon><span class="datas-title">评论数量：</span><span>{{GET_STAT.comment_num}}条</span>
              </div>
            </div>
            <div class="datas1 flex flex-v flex-pack-center">
              <div class="flex flex-align-center datas-label">
                <icon name="headphones" scale="1.0" style="color:#fff"></icon><span class="datas-title">歌曲数量：</span><span>{{GET_STAT.audio_num}}首</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <icon name="comments" scale="1.0" style="color:#fff"></icon><span class="datas-title">留言数量：</span><span>{{GET_STAT.message_num}}条</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <icon name="eye" scale="1.0" style="color:#fff"></icon><span class="datas-title">浏览数量：</span><span>{{GET_STAT.visitor_num}}次</span>
              </div>
              <div class="flex flex-align-center datas-label">
                <icon name="user" scale="1.0" style="color:#fff; width:16px;"></icon><span class="datas-title">用户数量：</span><span>{{GET_STAT.user_num}}人</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="second-box ">
      <div class="mail"><span style="line-height: 160px;">分享好的资料、项目等给我，不胜感激！</span><a href="mailto:1181050123@qq.com" class="mailto">邮来邮去</a></div>
    </div> -->
    <div class="second-box footer-design flex flex-v flex-align-center">
      <div>
        <span>CopyRight © 2017 &nbsp;&nbsp;邓鹏博客 &nbsp;&nbsp;Design by DengPeng</span>
      </span>
      </div>
      <div class="f-box">
        <p>该网站初创于2017年11月17日，属于个人独立开发。如有雷同，不是巧合，欢迎各位大神，给予批评和建议。谢谢大家！</p>
        <p>本网站以阿里云服务器，Node作为后台，Vue作为前端，统一开发</p>
      </div>
    </div>
  </footer>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import { mapGetters } from 'vuex'
export default {
  name: 'footers',
  components: {
    Icon
  },
  data() {
    return {
      activeIndex: '1',
      ruleForm: {
        name: '',
        website: '',
        email: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        email:[
          {required: true, message: '请输入您的邮箱', trigger: 'blur'}
        ],
        website:[
          {required: true, message: '请输入网站地址', trigger: 'blur'}
        ]
      }
    };
  },
  computed: {
    ...mapGetters ([
      'GET_FOOTER_SHOW',
      'GET_PLAY_STATUS',
      'GET_STAT'
    ])
  },
  // 路由监听
  // watch: {
  //   '$route':  (to, from, next) => {
  //     console.log(to)
  //   }
  // },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.applyFriends()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 申请友链
    applyFriends () {
      var para = {
        webname: this.ruleForm.name,
        website: this.ruleForm.website,
        email: this.ruleForm.email
      }
      axios.post('/api/applyFriendsLink', Qs.stringify(para))
      .then(res => {
        // console.log(res)
        this.$message.success(res.data.message)
      })
      .catch(err => {})
    }
  },
  mounted () {
    // console.log(this.GET_STAT)
    sr.reveal(document.querySelectorAll('.second-box'))
  }
}
</script>
<style type="text/css">
  .apply-friends .el-input__inner{
    background-color: transparent;
    height: 36px;
    color: #fff;
  }
  .apply-friends .el-form-item__label {
    color: #fff
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-ruleForm{
  padding-top: 10px;
}
.footers{
  padding-top: 35px;
}
.mail {
  text-align: center;
  height: 160px;
  margin: 20px 0 40px;
  background: #18aacf;
  color: #fff;
  font-size: 32px;
}
.mail  a {
  border: 1px solid #fff;
  font-size: 24px;
  min-width: 150px;
  display: inline-block;
  height: 42px;
  position: relative;
  top: -6px;
  transition: all 0.45s;
  color: #fff;
}
.mail  a:hover{
  background: #fff;
  color: #18aacf;
}
.box{
  height: 40px;
}
.box a {
  color: #4c4c4c;
}
.box a:hover {
  color: #18aacf;
}
.footer-design{
  font-size: 12px;
  background-color: rgba(85, 85, 85,0.7);
  box-shadow: 0px -40px 50px rgba(85, 85, 85,0.5);
  color: #fff;
  box-sizing: border-box;
  padding: 10px 0;
}
.f-box{
  margin-top: 10px;
  text-align: center;
  line-height: 1.6
}
.f-box p{
  margin: 0
}
.mysite a{
  margin-right: 10px;
}
.music{
  padding-bottom: 80px;
}
.footer-top{
  background-color: rgba(85, 85, 85,0.5);
}
.footer-info{
  max-width: 1500px;
  margin: 0 auto;
  padding: 40px 30px;
  box-sizing: border-box;
  color: #fff;
}
.title-label{
  color: #c9c9c9;
}
.link-addr{
  margin: 10px 0;
}
.link-addr a{
  color: #fff;
}
.link-addr a:hover span.link-title{
  text-decoration: underline;
}
.footer-title{
  margin-bottom: 10px;
}
.datas{
  width: 320px;
  min-width: 320px;
}
.datas-label{
  padding: 10px 0;
  flex-wrap: nowrap;
}
.datas-label>span:nth-child(2){
  width: 80px;
}
.datas-title{
  margin-left: 5px;
}
.link-label {
  padding: 0 9px;
  background-color: rgb(113,95,101);
  color: #fff;
  border-radius: 6px;
  margin-right: 10px;
}
.bgred{
  background-color: rgb(222,0,68);
}
.bggreen{
  background-color: rgb(37,202,111);
}
.bgorange{
  background-color: rgb(250,79,8);
}
</style>
