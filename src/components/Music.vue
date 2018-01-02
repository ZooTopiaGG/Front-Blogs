<template>
  <div>
    <div class="music">
      <div class="title">
        音乐专栏
      </div>
      <div class="m-content">
        <div class="music-header flex flex-align-center">
          <img class="avatar" src="../assets/images/23115938.jpg" alt="dengpeng">
          <div class="info flex-1">
            <div class="user"><span class="name">邓鹏</span> <span class="from">QQ音乐用户</span></div>
            <div class="intro">
              <span>个人介绍：</span> <span>因为刚好遇见你，留下十年的期许</span>
            </div>
            <div class="address">
              <span>所在地区：</span> <span>四川省-成都市</span>
            </div>
            <div class="age">
              <span>年龄：</span> <span>24岁</span>
            </div>
          </div>
        </div>
        <div class="music-list">
          <div class="music-list-title">
            歌曲列表 <span>累积共有{{ list.length }}首</span>
          </div>
          <ul class="list">
            <li class="list-cell flex flex-align-center flex-pack-justify" v-for="(item, index) in list" :key="index">
              <span style="width:25px">{{ index + 1 }}. </span>
              <audio class="audio" :src="item.url"> 亲，您的浏览器不支持html5的audio标签 </audio>
              <i style="margin:0 10px; cursor: pointer" @click.self="playorpause(index, item.singerName, item.songName)" :class="{active: index===i ? true: false }"></i> 
              <a href="javascript:;" class="music-title" style="color:#000;margin-left: 10px;">{{ item.songName }}</a> 
              <span style="margin: 0 5px">-</span> 
              <a href="javascript:;" >{{ item.singerName }}</a>
              <span class="flex-1"></span>
              <div class="playStatus" style="width:15px;height:10px;">
                <b></b>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalcount"
          class="page">
        </el-pagination>
      </div> -->
    </div>

    <div class="music-bg flex flex-align-center" v-show="GET_PLAY_STATUS">
      <div class="mb flex flex-align-center flex-pack-justify">
        <div class="music-btns flex flex-pack-justify">
          <a href="javascript:;" hidefocus="true" data-action="prev" class="prv" @click="prev" title="上一首(ctrl+←)">
            <icon name="step-backward" scale="1.8" style="color:#ddd"></icon>
          </a>
          <a href="javascript:;" hidefocus="true" data-action="pause" @click="isPlay" class="ply j-flag pas" title="播放/暂停(p)">
            <icon :name="names" scale="1.8" style="color:#ddd"></icon>
          </a>
          <a href="javascript:;" hidefocus="true" data-action="next" class="nxt" @click="next" title="下一首(ctrl+→)">
            <icon name="step-forward" scale="1.8" style="color:#ddd"></icon>
          </a>
        </div>
        <div class="music-process flex-1" style="width:400px;">
          <div class="flex flex-pack-justify" style="color:#fff; font-size:14px;">
            <span >{{ title }}</span>
            <span><span class="currentTime">00:00</span>/{{ durationTime }}</span>
          </div>
          <div style="position:relative; width:100%" @click="pointPos($event)">
            <div class="base-line1 base-line-audio-all-process"></div>
            <div class="flex flex-align-center">
              <div class="base-line base-line-audio-process"></div>
              <div class="base-ball"></div>
            </div>
          </div>
        </div>
        <div class="volume-btns flex flex-align-center" style="width: 160px;">
          <icon name="volume-up" scale="1.8" style="color:#ddd; margin-right:10px;"></icon>
          <div style="position:relative; width:100%">
            <div class="base-line1"></div>
            <div  class="flex flex-align-center">
              <div class="base-line"></div>
              <div class="base-ball"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// icon 图标
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import { mapGetters } from 'vuex'
export default {
  name: 'music',
  components:{
    Icon
  },
  computed: {
    ...mapGetters ([
      'GET_PLAY_STATUS'
    ]),
    // 以规定数量分割数组，并重组
    lists () {
      var arr = []
      this.list.map((x, i) => {
        if (i % 10 == 0) {
          arr.push([])
        }
        arr[arr.length-1].push()
      })
      return arr
    }
  },
  data () {
    return {
      list: [],
      totalcount: 100,
      currentPage4: 1,
      size: 100,
      page: 1,
      active: false,
      i: -1,
      names: 'play',
      timer: '',
      title: '',
      currentTime: '00:00',
      durationTime: '00:00',
      currentTimes: '00:00',
      index: 0, // 歌曲索引,
    }
  },
  methods: {
    handleSizeChange (val) {
      this.size = val
      this.getQQMusic()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getQQMusic()
    },
    getQQMusic () {
      var para = {
        size: this.size,
        page: this.page
      }
      axios.post('/api/getQQMusic', Qs.stringify(para))
      .then(res => {
        let result = res.data.result
        this.totalcount = res.data.total_count
        this.list = result
        // console.log(this.list)
        // loadingInstance.close()
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 播放暂停
    isPlay () {
      var $audio = $('.audio').eq(this.index).get(0)
      //改变暂停/播放icon
      if($audio.paused){
          $audio.play();
          this.names = 'pause'
      } else{
          $audio.pause();
          this.names = 'play'
      }
    },
    // 下一曲
    next () {
      if (this.index < this.list.length-1) {
        this.playorpause(this.index + 1, this.list[this.index + 1].singerName, this.list[this.index + 1].songName)
      } else {
        this.playorpause(0, this.list[0].singerName, this.list[0].songName)
      }
    },
    prev () {
      // 上一曲 判断 当前播放歌曲索引 如果比0大则 可上一曲 否则调到最后一曲
      if (this.index > 0) {
        this.playorpause(this.index - 1, this.list[this.index - 1].singerName, this.list[this.index - 1].songName)
      } else {
        this.playorpause(this.list.length - 1, this.list[this.list.length - 1].singerName, this.list[this.list.length - 1].songName)
      }
    },
    // 改变进度条
    updateProcess () {
      var self = this
      var $audio = $('.audio').eq(this.index).get(0);
      var value = Math.round((Math.floor($audio.currentTime) / Math.floor($audio.duration)) * 100);
      // $('.pgs-play').css('width', value * 0.907 + '%');
      // this.currentTime = Coms.transTime(value)
      // jquery 可实现实时更新当前进度
      $('.base-line-audio-process').css('width', value + '%');
      $('.currentTime').html(Coms.transTime($audio.currentTime))
      if(value == 100){
        self.names = 'play'
        if (self.index < self.list.length-1) {
          self.playorpause(self.index + 1, self.list[self.index + 1].singerName, self.list[self.index + 1].songName)
        } else {
          self.playorpause(0, self.list[0].singerName, self.list[0].songName)
        }
        self.names = 'pause'
        clearInterval(self.timer) // 播放完歌曲 自动停止定时器
      }
    },
    // 进度直接跳转到点击位置
    pointPos (e) {
      $('.base-line-audio-process').width(e.offsetX)
      var pgsWidth = $('.base-line-audio-all-process').width()
      // 计算点击位置 与 播放总长度 的比例 算时间比例
      var rate = e.offsetX/pgsWidth
      var $audio = $('.audio').eq(this.index).get(0);
      $audio.currentTime = $audio.duration * rate;
      // this.updateProcess();
    },
    // 点击图标播放歌曲
    async playorpause (index, singerName, songName) {
      var self = this
      self.$store.commit('MUISC_PLAYED')
      self.firstplay = true
      self.index = index
      clearInterval(this.timer) // 避免再次选择歌曲时  没重复
      var s = []
      this.title = `${songName} - ${singerName}`
      var str = ` 正在播放 ${songName} - ${singerName}`
      $('title').html(str)
      // 滚动 标题
      s = $('title').html().split("");
      function func(){
          s.push(s[0]);    
          s.shift();// 去掉数组的第一个元素
          document.title = s.join("");
      }    
      self.timer = setInterval(func,1000);//设置时间间隔运行   
      await $('.audio').get(this.i).pause()
      self.names = 'pause'
      self.i = index
      // console.log(`播放歌曲索引是：${index}`)
      var $audio = $('.audio').eq(index).get(0)
      // 获取音乐总时长
      self.durationTime = Coms.transTime($audio.duration)
      //  设置进度条
      $audio.addEventListener('timeupdate', self.updateProcess, false)
      $audio.play()
      // console.log($('.audio').eq(index).get(0).play())
    }
  },
  mounted () {
    this.getQQMusic()
    // console.log(this.$refs['audio'])
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
/*.music .title{
  padding-bottom: 20px;
}*/
.music{
  padding-top: 90px; 
  max-width: 1200px;
  margin: 0 auto;
}
.m-content{
  padding: 0 40px;
}
.avatar{
  width: 124px;
  height: 124px;
  border: 1px solid #d5d5d5;
  background: #fff;
  padding: 2px;
  border-radius: 2px;
  margin-right: 30px;
}
.music-header {
  font-size: 14px;
}
.user{
  border-bottom: 1px solid #d5d5d5;
  padding-bottom: 15px;
}
.music-list-title{
  padding-bottom: 10px;
  border-bottom: 2px solid #409EFF
}
.name {
  color: #000;
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
}
.from {
  color: #999;
}
.intro{
  padding-top: 15px;
}
.address{
  padding: 15px 0;
}

.music-list {
  padding: 40px 0;
  font-size: 14px;
}
.music-list-title{
  font-size: 24px;
}
.music-list-title span{
  font-size: 14px;
  color: #999;
}
.list .list-cell {
  height: 50px;
  line-height: 50px;
  transition: all 0.4s;
  font-size: 14px;
  padding-left: 20px;
}
.list .list-cell:hover{
  background: #eee
}
.list .list-cell i{
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(../assets/images/bf1.png) no-repeat;
  background-size: cover;
}
.list-cell a {
  color: #888
}
.list-cell a:hover{
  text-decoration: underline !important;
}
.list .list-cell i:hover{
  background: url(../assets/images/bf3.png) no-repeat;
  background-size: cover;
}
.list .list-cell i.active{
  background: url(../assets/images/bf2.png) no-repeat;
  background-size: cover;
}
.playStatus {
  padding: 5px 10px;
  background: #409EFF
}
.playStatus b {
  display: block;
  width: 15px;
  height: 10px;
  background: url(../assets/images/music.png) no-repeat;
  background-size: cover;
}
.list .list-cell i.active~.playStatus b{
  background: url(https://qzonestyle.gtimg.cn/aoi/skin/img/skin-gif/1-music-sonic.gif) no-repeat;
  background-size: cover;
}
.page {
  text-align: right;
  margin-top: 60px;
}
.music-bg {
  height: 80px;
  width: 100%;
  background: linear-gradient(70deg, #333, #666);
  background: -webkit-linear-gradient(70deg, #333, #666);
  background: -moz-linear-gradient(70deg, #333, #666);
  background: -ms-linear-gradient(70deg, #333, #666);
  background: -o-linear-gradient(70deg, #333, #666);
  position: fixed;
  bottom: 0;
  z-index: 9999;
}
.mb{
  width: 1200px;
  margin: 0 auto;
}
.music-btns {
  width: 120px;
  margin-top: 10px;
}
.music-process {
  margin-left: 40px;
  margin-right: 80px;
  margin-top: -9px;
}
.base-line1{
  position:absolute;
  top: 3px;
  width: 100%; 
  z-index: -1;
  height: 2px;
  background: #aaa;
}
.base-line {
  height: 2px;
  background: #fff;
  width: 0%;
}
.base-ball {
  width:8px;
  height:8px;
  border-radius:100%;
  background:#fff;
  box-shadow: 0 0 2px 2px #fff
}
</style>
