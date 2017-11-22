<template>
  <div class="program">
    <div class="title">技术专栏</div>
    <article class="article-list" v-for="(item, index) in list" :key="index">
      <div class="article-info flex flex-align-center flex-pack-justify">
        <div class="art-right">
          <div class="art-title">
            <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'p'  } }">{{ item.title }}</router-link>
          </div>
          <div class="author-info">
            <span class="author"><router-link :to="{ name : 'home' }">邓鹏</router-link></span> / 
            <span class="column-name"><router-link :to="{ name : 'articles' }">文章</router-link></span> / 
            <span class="article-type">{{ item.type }}</span> / 
            <span class="create-time">{{ item.createAt }}</span> /
            <span >阅读量：<span class="review-count">{{ item.viewcount }}</span></span>
          </div>
          <div class="desc">
            {{ item.desc }}
          </div>
        </div>
        <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'p'  } }">
          <img v-if="!item.smallimg" src="../assets/images/photo-peggy.jpg" alt="article">
          <img v-else :src="item.smallimg" alt="article">
        </router-link>
      </div>
      <div class="look">
        <el-button type="primary" @click="lookMore(item.id)">前往阅读</el-button>
      </div>
    </article>
    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'program',
  data () {
    return {
      list:[],
      currentPage4: 1,
      totalcount: 0,
      pagesize: 10,
      page: 1
    }
  },
  methods: {
    lookMore (id) {
      this.$router.push({ name: 'adetails', params: { articleid: id, type: 'p'  } })
    },
    handleSizeChange (val) {
      // 每页多少条
      console.log(val)
      this.pagesize = val
      this.getArticle()
    },
    handleCurrentChange (val) {
      // 当前页数
      console.log(val)
      this.page = val
      this.getArticle()
    },

    getArticle () {
      let para = {
        page: this.page,
        size: this.pagesize,
        columntype: 1 // 文章
      }
      axios.post('/api/getArticle', Qs.stringify(para))
      .then(res => {
        // this.$message.success('哈哈哈哈')
        if (res.data.result && res.data.result.length > 0) {
          this.totalcount = res.data.total
          this.list = res.data.result
          this.list.forEach(val => {
            if (val.type == 0) {
              val.type = '原创'
            } else {
              val.type = '转载'
            }
            val.createAt = Coms.getCommonTime(val.createAt)
          }) 
          // loadingInstance.close()
          return 'ok'
        } else {
          this.$message.success('没有文章')
        }
      })
      // promise 依次执行 回调
      .then(res => {
        if (res) {
          sr.reveal(document.querySelectorAll('.article-list')) // 每个元素 都依次执行 动画
          // sr.reveal('.article-list', { container: '#articles' }) // 所有元素一起执行
        }
      })
      .catch(err => {})
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>
<style type="text/css">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.program .title{
  padding-bottom: 20px;
}
.program{
  padding-top: 90px; 
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 60px;
}
.page {
  text-align: right;
  margin-top: 60px
}

.article-list{
  padding:20px 40px;
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
.article-info img{
  width: 200px;
  height: 120px;
  margin-right: 25px;
  border: 1px solid #ddd;
}
.art-title{
  font-size: 18px;
}
.art-right{
  margin-right: 40px;
}
.art-title a,.art-right a {
  color: #18aacf
}
.art-title a:hover,.art-right a:hover{
  text-decoration: underline;
}
.author-info {
  font-size: 14px;
  margin:20px 0 10px 0; 
}
.desc{
  font-size: 14px;
  color: #333;
  line-height: 1.5
}
.look{
  margin-top: 10px;
}
</style>
