<template>
  <div class="dynamic">
    <div class="title">动态专栏</div>
    <div class="dy-box flex" v-for="(item, index) in lists" :key='index'>
      <div class="avatar">
        <img src="../assets/images/23115938.jpg" alt="avatar">
      </div>
      <div class="dy-con flex-1">
        <div class="con">
          <div class="content">
            <router-link :to="{ name: 'home' }" style="color:#409EFF">邓鹏</router-link>。 &nbsp;&nbsp;{{ item.content }}
          </div>
          <div class="time"><span>发布时间：</span><span>{{ item.createAt }}</span></div>
        </div>
        <div class="comment">
          <el-input type="textarea" v-model="item.value"></el-input>
          <div class="btn-primary">
            <el-button type="primary">发布评论</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
$(function () {
  // $('.sy-box').height($(window).height())
  // $('.fb').css('marginTop','-'+$(window).height()/2+'px')
  
})
export default {
  name: 'dynamic',
  data () {
    return {
      list: [],
      comment: ''
    }
  },
  computed: {
    lists () {
      var arr = []
      this.list.forEach(val => {
        val.value = '' // 返回的不是observe对象
        val.createAt = Coms.getCommonTime1(val.createAt)
        arr.push(val)
      })
      return arr
    }
  },
  methods: {
    getDynamicList () {
      axios.get('/api/getDynamicList')
      .then(res => {
        this.list = res.data.result
        loadingInstance.close()
        return 'ok'
      })
      .then(res => {
        if (res) {
          sr.reveal(document.querySelectorAll('.dy-box'))
          // sr.reveal('.article-list', { container: '#articles' })
        }
      })
      .catch(err => {})
    }
  },
  mounted () {
    this.getDynamicList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.dynamic {
  padding-top: 90px; 
  max-width: 1200px;
  margin: 0 auto;
}
.dy-box{
  padding: 0 40px 40px;
}
.avatar img{
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 20px;
}
.dy-con {
  border-radius: 3px;
}
.dy-con:hover{
  -webkit-box-shadow: 1px 1px 10px 2px #CCC;
  -moz-box-shadow: 1px 1px 10px 2px #CCC;
  -webkit-transition: all .4s;
  border-color: red;
}
.dy-con .con{
  border: 1px solid #87ceeb;
  border-radius: 3px 3px 0 0;
  padding: 20px;
  font-size: 13px;
  color: #888
}
.dy-con .content{
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}
.dy-con .time{
  margin: 15px 0 0
}
.comment {
  border: 1px solid #87ceeb;
  border-top: 0;
  padding: 15px;
  border-radius: 0 0 3px 3px
}
.comment textarea {
  width: 80%;
  min-height: 16px;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 14px;
}
.btn-primary {
  margin-top: 15px;
}
</style>
