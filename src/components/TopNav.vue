<template>
  <div v-show='GET_NAV_SHOW' :class="[{navs: true}, { isHome: GET_IS_HOME }]">
    <div class="menus flex flex-pack-around">
      <div class="logo flex-1">
        <router-link :to="{ name: 'home' }">
          <!-- <img src="../assets/images/logo1.png"> -->
          <img src="../assets/images/logo2.png">
        </router-link>
      </div>
      <div class="flex">
        <ul class="menu flex">
          <li :class="{ active: $route.name === 'home'}">
            <router-link :to="{ name: 'home' }">首页</router-link>
          </li>
          <li 
            :class="{ active: $route.name === 'program' || $route.path.indexOf('articles/p') > -1 || $route.name === 'articles' || $route.path.indexOf('articles/a') > -1 }"
            @mouseenter.prevent="show1 = true" 
            @mouseleave.prevent="show1 = false" 
            style="position:relative">
            <!-- <router-link :to="{ name: 'program' }">技术</router-link> -->
            <a href="javascript:;">分类</a>
            <el-collapse-transition>
              <div v-show="show1" class="showit transition-box" style="left: -46px;">
                  <ul class="item">
                    <li class="kind flex flex-align-center" :class="{ active: $route.name === 'program' || $route.path.indexOf('articles/p') > -1}" >
                      <router-link :to="{ name: 'program' }">技术类</router-link>
                    </li>
                    <li class="kind flex flex-align-center" :class="{ active: $route.name === 'articles' || $route.path.indexOf('articles/a') > -1 }">
                      <router-link :to="{ name: 'articles' }">文章类</router-link>
                    </li>
                  </ul>
              </div>
            </el-collapse-transition>
          </li>
          <!-- <li >
            <router-link :to="{ name: 'articles' }">文章</router-link>
          </li> -->
          <li :class="{ active: $route.path === '/dynamic'}">
            <router-link :to="{ name: 'dynamic' }">动态</router-link>
          </li>
          <li :class="{ active: $route.path === '/music'}">
            <router-link :to="{ name: 'music' }">音乐</router-link>
          </li>
          <li :class="{ active: $route.path === '/album/all'}">
            <router-link :to="{ name: 'albums' }">相册</router-link>
          </li>
          <li :class="{ active: $route.path === '/messageboard'}">
            <router-link :to="{ name: 'messageboard' }">留言板</router-link>
          </li>
          <li :class="{ active: $route.name === 'info'}">
            <router-link :to="{ name: 'info' }">关于我</router-link>
          </li>
        </ul>
        <div class="sign" v-if="!GET_LOGIN_STATUS">
          <router-link :to="{ name: 'signin' }">登录</router-link>
          /
          <router-link :to="{ name: 'signup' }">注册</router-link>
        </div>
        <div class="sign" @mouseenter.prevent="show = true" @mouseleave.prevent="show = false" v-else>
          <div class="info flex flex-align-center">
            <img v-if="GET_LOGIN_STATUS.avatar" :src="GET_LOGIN_STATUS.avatar" style="margin-top: 11px; width: 48px;height: 48px;border-radius: 100%;">
            <img v-else src="../assets/images/signin.png" style="margin-right: 5px">
            <!-- <span>{{ GET_LOGIN_STATUS.name }}</span> -->
          </div>
          <el-collapse-transition>
            <div v-show="show" class="showit transition-box">
                <ul class="item">
                  <li class="setting flex flex-align-center" @click="toinfo"><i></i>站长信息</li>
                  <li class="signout flex flex-align-center" @click="signout"><i></i>登出</li>
                </ul>
            </div>
          </el-collapse-transition>
        </div>
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
      show1: false,
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
      this.$router.push({ name: 'info' })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navs{
  height: 70px;
  position: fixed;
  top: 0;
  background: transparent;
  width: 100%;
  transition: all 0.45s;
  z-index: 9;
  color: #fff;
  padding-top: 25px;
}
.navs.isHome{
  /*background: #18aacf;*/
  background: #fff;
  box-shadow: 0 0 5px #18aacf;
  -webkit-box-shadow: 0 0 5px #18aacf;
  -moz-box-shadow: 0 0 5px #18aacf;
  padding-top: 0
}
.menus{
  padding-left: 30px;
  padding-right: 30px;
  max-width: 1500px;
  box-sizing: border-box;
  margin: 0 auto;
  /*overflow: hidden;*/
}
.menu li {
  padding: 0 30px;
  box-sizing: border-box;
  font-size: 0;
}
.menu li a {
  height: 69px;
  font-size: 15px;
}

.menu>li.active>a,.menu>li:hover>a {
  color: #13afff;
}
.menu a{
  display: block;
  min-width: 40px;
  height: 100%;
  color: #666;
  text-align: center;
}
.logo, .logo img{
  height: 70px;
  overflow: hidden;
}

.menu, .sign {
  font-size: 16px;
  line-height: 70px;
  height: 70px;
}
.sign {
  text-align: center;
  cursor: pointer;
  position: relative;
  padding-left: 50px; 
}
.showit{
  margin-top: 10px;
  width: 200px;
  background: #fff;
  box-shadow: 1px 1px 10px 1px #CCC;
  -webkit-box-shadow: 1px 1px 10px 1px #CCC;
  -moz-box-shadow: 1px 1px 10px 1px #CCC;
  border-bottom-color: red;
  color: #4c4c4c;
  position: absolute;
  right: 0;
  top: 70px;
  line-height: 60px;
  text-align: left;
}
.item li {
  transition: all 0.45s;
  -webkit-transition: all 0.45s;
  -moz-transition: all 0.45s;
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
.sign, .sign a {
  color: #666;
}
.signin{
  float: right;
}
.signup{
  float: right;
}
.kind>a{
  width: 100%;
}
.kind.active>a{
  color: #13afff;
}
.kind:hover>a {
  color: #fff;
} 
</style>
