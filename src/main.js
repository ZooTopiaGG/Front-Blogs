// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import vuex from 'vuex'
// 监听滚动
import vuescroll from 'vue-scroll'
Vue.use(vuescroll)
Vue.use(vuex)
//按需加载 Element-ui
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import { 
  Button, 
  Select,
  Form,
  FormItem,
  Input,
  Upload,
  Radio,
  RadioGroup,
  Col,
  Pagination,
  DatePicker,
  Loading,
  Message
} 
from 'element-ui'
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Col)
Vue.use(Pagination)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(DatePicker)
Vue.use(Loading.directive);

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/common.css'
import Coms from './assets/js/fn.js'

Vue.config.productionTip = false

window.Coms = Coms

window.sr = ScrollReveal();

// 正式网
// window.baseUrl = 'http://pay.lawyer-says.com/api/'
// 测试
// window.baseUrl = 'http://pay.lawyer-says.cn/'
// qs
window.Qs = require('../node_modules/qs')

// AXIOS
window.axios = require('../node_modules/axios')

// import axios from 'axios'
// 响应时间
axios.defaults.timeout = 5000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 测试网接口地址
// axios.defaults.baseURL = 'http://localhost:8088/'
// 正式网接口地址
axios.defaults.baseURL = 'http://api.55lover.com/'

// 添加一个请求拦截器
axios.interceptors.request.use(config => {
  // 在请求发出之前进行一些操作
  // window.loadingInstance = Loading.service({fullscreen: true, text: '正在加载...'});
  return config
}, err => {
  // Do something with request error
  Message.error({
    message: '系统繁忙，请稍候再试'
  })
  return Promise.reject(err)
})

// 添加一个响应拦截器
axios.interceptors.response.use(res => {
  // 在这里对返回的数据进行处理
  // loadingInstance.close();
  return res
}, err => {
  // Do something with response error
  Message.error({
    message: err.response.data.message
  })
  return Promise.reject(err)
})

router.beforeEach((to, from, next) => {
  store.commit('MUISC_NO_PLAY')
  // 获取localstorage
  let user = window.localStorage.getItem('55lover_reader')
  let _user = JSON.parse(user)
  // console.log(_user)
  if (_user && _user.id) {
    // console.log(`您已登录--${_user.id}`)
    store.dispatch('YET_LOGIN', _user)
  } else {
    // console.log(`您未登录`)
    store.dispatch('NO_LOGIN', null)
  }
  if (to.path == '/signin' || to.path == '/signup') {
    store.commit('HIDE_NAV')
    store.commit('HIDE_FOOTER')
  } else {
    store.commit('SHOW_NAV')
    store.commit('SHOW_FOOTER')
  }
  if (to.name == 'home') {
    store.commit('BG_HIDE_NAV')
    // location.href = location.href
  } else {
    store.commit('BG_SHOW_NAV')
  }

  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

