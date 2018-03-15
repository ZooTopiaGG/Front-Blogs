<template>
  <div class="body" :style="{'background-image': bmg}">
    <div id="app">
      <top-nav></top-nav>
      <div class="main">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <footer-nav></footer-nav>
      <div class="top" @click='backtotop' v-show="totop">
        <img src="./assets/images/top-arrow.png" alt="top">
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import FooterNav from '@/components/FooterNav'
export default {
  name: 'app',
  data () {
    return {
      scrolled: false,
      totop: false,
      background:[
        'http://wallpaper.55lover.com/image/wallpaper/bg1.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg2.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg6.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg3.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg4.jpg',
      ]
    }
  },
  components: {
    TopNav,
    FooterNav
  },
  computed: {
    bmg () {
      let round = Math.floor(Math.random() * this.background.length)
      return `url(${this.background[round]})`
    }
  },
  methods: {
    handleScroll (e) {
      let s = document.querySelector('.s-left')
      if (this.$route.name == 'home') {
        // console.log(window.scrollY)
        if(window.scrollY >= 100){
          this.$store.commit('BG_SHOW_NAV')
        } else {
          this.$store.commit('BG_HIDE_NAV')
        }
      } else {
        this.$store.commit('BG_SHOW_NAV')
      }
      if (window.scrollY >= 1000) {
        this.totop = true
      } else {
        this.totop = false
      }
    },
    backtotop () {
        var timer = setInterval(() => {
          let h = document.documentElement.scrollTop || document.body.scrollTop;
          let nowH = h
          var speed = (0 - nowH) / 5;                     // 随着高度减速  
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);  
          if (h === 0) {                          //当前高度为零,停止这次计时器  
            clearInterval(timer);                             // C1  
          }
          document.documentElement.scrollTop = h + speed
          document.body.scrollTop = h + speed
        }, 30)
    },
    getStatistics () {
      axios.get('/api/getStatistics')
      .then(res => {
        // console.log(res.data.result)
        this.$store.commit('SEND_STAT', res.data.result)
      })
      .catch(err => {})
    },
  },
  mounted () {
    this.getStatistics()
    sr.reveal('.second-box');
    this.$nextTick ( () => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style>
  .block .el-pagination__total,.block .el-pagination__jump{
    color: #fff
  }
  #app {
    min-width: 1115px;
  }
  .body{
    background-attachment: fixed;
    background-repeat: repeat;
    background-size: 100% 100%;
  }
  body{
    color: #444;
    font-size: 15px;
    line-height: 1.7;
  }
  .main{
    padding-top: 120px;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 1500px;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
  }
  .title, .center-title{
    padding: 6px 20px;
    font-size: 16px;
    color: #444;
    background-color: rgba(255,255,255,0.5);
    margin-bottom: 20px;
  }
  .center-title{
    padding: 6px 10px;
    margin-bottom: 0
  }
  .title-label {
    font-size: 14px;
    color: #666;
  }
  .title-text{
    margin: 0 10px;
  }
  .details-title{
    padding: 40px;
    font-size: 28px;
    color: #333;
    line-height: 1.6
  }
  .editormd-html-preview, .editormd-preview-container{
    font-size: 16px;
  }
  .top {
    position: fixed;
    right: 30px;
    bottom: 88px;
    cursor: pointer;
  }
  #doc-content {
    font-size: 16px;
  }
  #doc-content pre{
    display: block;
    margin: 0 0 10px;
    border: 1px solid #ccc;
    padding: 15px;
    font-size: 13px;
    word-wrap: normal;
    word-break: break-word!important;
    word-break: break-all;
    white-space: pre;
    overflow: auto;
    border-radius: 0;
    background: #f6f6f6;
    color: #657b83;
  }
  #doc-content img{
    width: 100%
  }
  /*调整*/
  .right-content{
    width: 27.5%;
    min-width: 320px;
    margin-left: 20px;
  }
  .box{
    padding: 20px;
    box-sizing: border-box;
  }
  .bgbox{
    background: rgba(255,255,255,0.5);
    box-sizing: border-box;
    margin-bottom: 25px;
  }
  .page {
    text-align: right;
    margin-top: 60px
  }
  .article-list{
    padding:20px;
  }
  .article-list:hover{
    -webkit-box-shadow: 1px 1px 10px 2px #CCC;
    -moz-box-shadow: 1px 1px 10px 2px #CCC;
    -webkit-transition: all .4s;
    border-color: red;
  }
  .article-list:last-child{
    margin-bottom: 40px;
  }
  .imgbox{
    font-size: 0;
    min-width: 200px;
    height: 128px;
  }
  .imgbox img{
    width: 200px;
    height: 128px;
    /*margin-right: 25px;*/
    border: 1px solid #ddd;
  }
  .art-title{
    font-size: 16px;
    margin-bottom: 10px;
  }
  .art-right{
    margin-right: 20px;
    min-height: 130px;
  }
  .art-title a,.art-right a {
    color: #18aacf
  }
  .art-title a:hover,.art-right a:hover{
    text-decoration: underline;
  }
  .author-info {
    font-size: 14px;
    /*margin-top: 10px; */
    color: #555
  }
  .desc{
    font-size: 14px;
    line-height: 1.5;
    text-align: justify;
    margin-bottom: 10px;
  }
  .look{
    margin-top: 10px;
  }
  .column-name{
    padding: 5px 8px;
    background-color: rgb(0, 168, 250);
    border-radius: 6px;
    font-size: 12px;
  }
  .column-name a {
    color: #fff
  }
  .create-time{
    margin-right: 20px;
  }
  .icon-label{
    margin-right: 5px;
  }
</style>
