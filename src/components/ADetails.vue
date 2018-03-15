<template>
  <div class="adetails bgbox box">
    <div class="details-title">{{ title }}</div>
    <div class="desc flex flex-align-center">
      <img class="avatar" src="../assets/images/23115938.jpg" alt='avatar'>
      <div class="desc-info">
        <div class="author">
          <span>作者：</span>
          <router-link :to="{ name: 'home' }">邓鹏</router-link>
          <span class="type">类型：</span>
          <span>{{ type }}</span>
        </div>
        <div class="art-info">
          <span>创建时间：</span><span class="time" style="margin-right:15px;">{{ createtime }}</span>
          <span>阅读：</span><span>{{ viewcount }}</span>
        </div>
      </div>
    </div>
    <article class="content" id='doc-content' v-html="content">
    </article>
  </div>
</template>

<script>

export default {
  name: 'adetails',
  data () {
    return {
      title: '',
      content: '',
      type: '原创',
      viewcount: 0,
      createtime: ''
    }
  },
  methods: {
    getArticle () {
      axios.get('/api/getArticle/'+ this.$route.params.articleid)
      .then(res => {
        this.title = res.data.result.title
        $('title').html(`${this.title}_邓鹏博客`)
        if (res.data.result.type == 0) {
          this.type = '原创'
        } else {
          this.type = '转载'
        }
        this.viewcount = res.data.result.viewcount
        this.createtime = Coms.getCommonTime(res.data.result.createAt)
        this.content = res.data.result.content
      })
      .catch(err => {})
    }
  },
  mounted () {
    this.getArticle()
    sr.reveal(document.querySelectorAll('.box'))
  }
}
</script>
<style type="text/css">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adetails{
  max-width: 920px;
  margin: 0 auto;
}
.desc{
  font-size: 14px;
  padding: 0 40px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  margin-right: 20px;
}
.author a {
  color: #18aacf
}
.author a:hover{
  text-decoration: underline;
}
.type {
  margin-left: 20px;
}
.art-info {
  font-size: 12px;
  margin-top: 10px;
}
.time{
  color: #808080
}
.content {
  margin-top: 40px;
  padding: 0 40px;
}


</style>
