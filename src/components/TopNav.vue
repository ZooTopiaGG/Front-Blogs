<template>
  <div class="navs" v-show='GET_NAV_SHOW' :class="{ isHome: GET_IS_HOME }">
    <div class="menus flex flex-pack-around">
      <div class="logo flex-1">
        <router-link :to="{ name: 'home' }">
          <span></span>
        </router-link>
      </div>
      <ul class="menu flex">
        <li :class="{ active: $route.name === 'program' || $route.path.indexOf('articles/p') > -1}">
          <router-link :to="{ name: 'program' }">技术</router-link>
        </li>
        <li :class="{ active: $route.name === 'articles' || $route.path.indexOf('articles/a') > -1 }">
          <router-link :to="{ name: 'articles' }">文章</router-link>
        </li>
        <li :class="{ active: $route.path === '/dynamic'}">
          <router-link :to="{ name: 'dynamic' }">动态</router-link>
        </li>
        <li :class="{ active: $route.path === '/music'}">
          <router-link :to="{ name: 'music' }">音乐</router-link>
        </li>
      </ul>
      <div class="sign" v-if="!GET_LOGIN_STATUS">
        <router-link :to="{ name: 'signin' }">登录</router-link>
        /
        <router-link :to="{ name: 'signup' }">注册</router-link>
      </div>
      <div class="sign" v-else>
        <div class="info flex flex-align-center" @click="show = !show">
          <img v-if="GET_LOGIN_STATUS.avatar" :src="GET_LOGIN_STATUS.avatar" style="margin-right: 10px;width: 48px;height: 48px;border-radius: 100%;">
          <img v-else src="../assets/images/signin.png" style="margin-right: 5px">
          <span>{{ GET_LOGIN_STATUS.name }}</span>
        </div>
        <el-collapse-transition>
          <div v-show="show" class="showit transition-box">
              <ul class="item">
                <li class="setting flex flex-align-center" @click="toinfo"><i></i>个人资料</li>
                <li class="signout flex flex-align-center" @click="signout"><i></i>登出</li>
              </ul>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navs',
  data() {
    return {
      activeIndex: '1',
      show: false,
      res: {}
    };
  },
  computed: {
    ...mapGetters ([
      'GET_NAV_SHOW',
      'GET_IS_HOME',
      'GET_LOGIN_STATUS'
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
    signout () {
      window.localStorage.clear();
      this.show = false;
      this.$store.dispatch('NO_LOGIN', null)
    },
    toinfo () {
      this.show = false;
      this.$router.push({ name: 'info', params: { userid: this.GET_LOGIN_STATUS.id } })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navs{
  height: 90px;
  position: fixed;
  top: 0;
  background: rgba(0,0,0,0);
  width: 100%;
  transition: all 0.45s;
  z-index: 9;
  padding-top: 25px;
}
.navs.isHome{
  background: #18aacf;
  /*box-shadow: 1px 1px 10px 1px #CCC;
  -webkit-box-shadow: 1px 1px 10px 1px #CCC;
  -moz-box-shadow: 1px 1px 10px 1px #CCC;*/
  /*border-bottom-color: red;*/
  -webkit-transition: all .4s;
  padding-top: 0
}
.menus{
  padding-left: 30px;
  padding-right: 75px;
  margin: 0 auto;
  overflow: auto;
}
.logo, .logo img{
  height: 90px;
  overflow: hidden;
}
.logo span{
  display: inline-block;
  width: 266px;
  height: 60px;
  margin-top: 15px;
  background: url(../assets/images/a8e57c6141974e8f84d18ac79a75908f.png) no-repeat;
  background-size: cover;
}
.scroll-nav{
  background: #efefef;

}
.scroll-nav .logo span{
  background: url(../assets/images/73068c09df2142dfbcd926b6c4056dc6.png) no-repeat;
  background-size: cover;
}
.menu, .sign {
  font-size: 16px;
  line-height: 90px;
  height: 90px;
}
.sign {
  min-width: 100px;
  text-align: center;
  cursor: pointer;
}
.showit{
  box-shadow: 1px 1px 10px 1px #CCC;
  -webkit-box-shadow: 1px 1px 10px 1px #CCC;
  -moz-box-shadow: 1px 1px 10px 1px #CCC;
  border-bottom-color: red;
  color: #4c4c4c;
  margin-top: 10px; 
  padding: 10px 0;
  height: 120px;
  width: 200px;
  position: absolute;
  top: 90px;
  right: 75px;
  z-index:99;
  line-height: 60px;
  background: #fff;
  text-align: left;
}
.item li {
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  padding-left: 20px;
}
.item li:hover {
  background: #18aacf;
  color: #fff;
  /*height: 40px;*/
}
.item li i {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.setting i {
  background: url(../assets/images/sz.png) no-repeat;
  background-size: cover 
}
.signout i {
  background: url(../assets/images/signout.png) no-repeat;
  background-size: cover 
}
.item li.setting:hover i{
  background: url(../assets/images/sz2.png) no-repeat;
  background-size: cover 
}
.item li.signout:hover i{
  background: url(../assets/images/signout2.png) no-repeat;
  background-size: cover 
}
.menu li {
  padding: 0 30px;
}
.menu li a {
  height: 89px;
  transition: all 0.45s;
}
.menu li:hover a{
  /*font-size: 18px;
  font-weight: bold;*/
  border-bottom: 1px solid #fff;
}
.menu li.active{
  background: #13afff;
}
.menu a{
  display: block;
  width: 40px;
  height: 100%;
  color: #fff;
  text-align: center;
}
.scroll-nav .menu a, .scroll-nav .sign,.scroll-nav .sign a {
  color: #333;
  font-weight: bold;
}
.sign, .sign a {
  color: #fff;
}
.sign {
  margin-left: 50px; 
}
.signin{
  float: right;
}
.signup{
  float: right;
}
</style>
