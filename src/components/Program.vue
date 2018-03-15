<template>
  <section class="flex">
    <div class="program flex-1 left-content">
      <div class="title flex flex-align-center">
        <icon name="codepen" scale="1.1" style="color:#00AACD"></icon>
        <span class="title-text">技术专栏</span>
        <span class="title-label">Technical column</span>
      </div>
      <article class="article-list bgbox" v-for="(item, index) in list" :key="index">
        <div class="article-info flex flex-align-center flex-pack-justify">
          <div class="art-right flex flex-v flex-pack-justify flex-1">
            <div class="art-title">
              <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'p'  } }">{{ item.title }}</router-link>
            </div>
            <div class="desc">
              {{ item.desc }}
            </div>
            <div class="author-info flex flex-align-center flex-pack-justify">
              <span class="column-name"><router-link :to="{ name : 'articles' }">技术集</router-link></span>
              <div class="flex flex-align-center">
                <span class="create-time flex flex-align-center"><icon name="calendar" class="icon-label" scale="1.0" light style="color:#00AACD"></icon>{{ item.createAt }}</span>
                <span class="flex flex-align-center"><icon name="eye" light scale="1.0" class="icon-label"  style="color:#00AACD"></icon><span class="review-count">{{ item.viewcount }}</span></span>
              </div>
            </div>
          </div>
          <router-link class="imgbox" :to="{ name: 'adetails', params: { articleid: item.id, type: 'p'  } }">
            <img v-if="!item.smallimg" src="../assets/images/photo-peggy.jpg" alt="article">
            <img v-else :src="item.smallimg" :onerror="logo" alt="article">
          </router-link>
        </div>
        <!-- <div class="look">
          <el-button type="primary" @click="lookMore(item.id)">前往阅读</el-button>
        </div> -->
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
    <!-- 右边内容区域 -->
    <div class="right-content">
      <asides></asides>
    </div>
  </section>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Asides from '@/components/Aside'
export default {
  name: 'program',
  data () {
    return {
      list:[],
      currentPage4: 1,
      totalcount: 0,
      pagesize: 10,
      page: 1,
      logo: 'this.src="http://file.55lover.com/uploads/aff0d0293f71.jpg"' 
    }
  },
  components: {
    Asides,
    Icon
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
    $('title').html('优雅的学习态度_技术专栏_邓鹏博客')
    this.getArticle()
  }
}
</script>
<style type="text/css">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.program{
  padding-bottom: 60px;
}
</style>
