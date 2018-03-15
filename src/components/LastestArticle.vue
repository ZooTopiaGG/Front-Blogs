<template> 
  <section class="flex">
    <div class="articles left-content flex-1" id="articles">
      <div class="title flex flex-align-center">
        <icon name="codepen" scale="1.2" style="color:#00AACD"></icon>
        <span class="title-text">最新文章</span>
        <span class="title-label">Article column</span>
      </div>
      <article class="article-list bgbox" v-for="(item, index) in list" :key="index">
        <div class="article-info flex flex-align-center flex-pack-justify">
          <div class="art-right flex flex-v flex-pack-justify flex-1">
            <div class="art-title" v-if="item.columntype==0">
              <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'a' } }">{{ item.title }}</router-link>
            </div>
            <div class="art-title" v-else>
              <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'p' } }">{{ item.title }}</router-link>
            </div>
            <div class="desc flex-1">
              {{ item.desc }}
            </div>
            <div class="author-info flex flex-align-center flex-pack-justify">
              <!-- <span class="author"><router-link :to="{ name : 'home' }">邓鹏</router-link></span> /  -->
              <span class="column-name" v-if="item.columntype==0"><router-link :to="{ name : 'articles' }">文章类</router-link></span>
              <span class="column-name" v-else><router-link :to="{ name : 'program' }">技术类</router-link></span>
              <!-- <span class="article-type">{{ item.type }}</span> /  -->
              <div class="flex flex-align-center">
                <span class="create-time flex flex-align-center"><icon name="calendar" class="icon-label" scale="1.0" light style="color:#00AACD"></icon>{{ item.createAt }}</span>
                <span class="flex flex-align-center"><icon name="eye" light scale="1.0" class="icon-label"  style="color:#00AACD"></icon><span class="review-count">{{ item.viewcount }}</span></span>
              </div>
            </div>
          </div>
          <router-link v-if="item.columntype==0" class="imgbox" :to="{ name: 'adetails', params: { articleid: item.id, type: 'a'  } }">
            <img v-if="!item.smallimg" src="../assets/images/photo-peggy.jpg" alt="article">
            <img v-else :src="item.smallimg" :onerror="logo" alt="article">
          </router-link>
          <router-link v-else class="imgbox" :to="{ name: 'adetails', params: { articleid: item.id, type: 'p'  } }">
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
    <!-- 右边内容区域 待设计 保留区域-->
    <div class="right-contents lastest">
      <!-- 相册 -->
      <div class="box bgbox">
        <div class="center-title flex flex-align-center">
          <icon name="image" scale="1.2" style="color:#00AACD"></icon>
          <span class="title-text">我的相册</span>
          <span class="title-label">My albums</span>
        </div>
        <!-- 照片流 -->
        <div class="flex flex-v flex-align-center">
          <!-- 人物类 -->
          <router-link :to="{ name: 'album', params: { type: 'person' } }" title="人物图册" class="album-face flex flex-align-center flex-pack-center">
            <div class="hide-over">
              <div class="hide-text flex flex-v flex-align-center flex-pack-center">
                <span>梦里花落知多少</span>
                <span>my lover</span>
              </div>
            </div>
            <div class="photo-num">50</div>
            <img class="album-face-img" src="../assets/images/26152352.jpg">
          </router-link>
          <!-- 地点类 -->
          <router-link :to="{ name: 'album', params: { type: 'wallpaper' } }" title="壁纸图册" class="album-face flex flex-align-center flex-pack-center">
            <div class="hide-over">
              <div class="hide-text flex flex-v flex-align-center flex-pack-center">
                <span>春风十里不如你</span>
                <span>wallpaper</span>
              </div>
            </div>
            <div class="photo-num">50</div>
            <img class="album-face-img" src="../assets/images/20180226161627.jpg" >
          </router-link>
          <!-- 风景类 -->
          <router-link :to="{ name: 'album', params: { type: 'scenery' } }" title="风景图册" class="album-face flex flex-align-center flex-pack-center">
            <div class="hide-over">
              <div class="hide-text flex flex-v flex-align-center flex-pack-center">
                <span>再美也不过如此</span>
                <span>scenery</span>
              </div>
            </div>
            <div class="photo-num">50</div>
            <img class="album-face-img" src="../assets/images/bg4.jpg" >
          </router-link>
        </div>
      </div>
      <!-- 视频 -->
      <div class="box bgbox">
        <div class="center-title flex flex-align-center">
          <icon name="film" scale="1.2" style="color:#00AACD"></icon>
          <span class="title-text">我的视频</span>
          <span class="title-label">My videos</span>
        </div>
        <!-- 视频流 -->
        <div class="flex flex-v flex-align-center">
          <!-- 人物类 -->
          <a href="javascript:;" title="秒拍视频" class="album-face flex flex-align-center flex-pack-center">
            <div class="photo-num">50</div>
            <img class="videos-face-img" src="../assets/images/26152352.jpg">
          </a>
        </div>
      </div>
      <!-- 书籍 -->
      <div class="box bgbox">
        <div class="center-title flex flex-align-center">
          <icon name="book" scale="1.2" style="color:#00AACD"></icon>
          <span class="title-text">推荐书籍</span>
          <span class="title-label">Books</span>
        </div>
        <div class="flex flex-v flex-align-center">
          <a href="https://book.douban.com/subject/10546125/" target="_blank" title="JavaScript高级程序设计（第3版）" class="album-face flex flex-align-center flex-pack-center">
            <img class="album-face-img" src="../assets/images/s8958650.jpg">
          </a>
          <a href="https://book.douban.com/subject/25786074/" target="_blank" title="HTML5权威指南" class="album-face flex flex-align-center flex-pack-center">
            <img class="album-face-img" src="../assets/images/s27169241.jpg">
          </a>
          <a href="https://book.douban.com/subject/4866934/" target="_blank" title="Python基础教程" class="album-face flex flex-align-center flex-pack-center">
            <img class="album-face-img" src="../assets/images/s4387251.jpg">
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Asides from '@/components/Aside'
export default {
  name: 'articles',
  data () {
    return {
      list:[],
      // 当前页
      currentPage4: 1,
      // 总条数
      totalcount: 200,
      // 每页多少条
      pagesize: 10,
      // 页值
      page: 1,
      // logo: 'this.src="' + require('http://file.55lover.com/uploads/aff0d0293f71.jpg') + '"' ,
      logo: 'this.src="http://file.55lover.com/uploads/aff0d0293f71.jpg"' 
    }
  },
  components: {
    Asides,
    Icon
  },
  methods: {
    lookMore (id) {
      this.$router.push({ name: 'adetails', params: { articleid: id, type: 'a' } })
    },
    handleSizeChange (val) {
      // 每页多少条
      // console.log(val)
      this.pagesize = val
      this.getLatestArticles()
    },
    handleCurrentChange (val) {
      // 当前页数
      // console.log(val)
      this.page = val
      this.getLatestArticles()
    },
    getLatestArticles () {
      let para = {
        page: this.page,
        pagesize: this.pagesize
      }
      axios.post('/api/getLatestArticles', Qs.stringify(para))
      .then(res => {
        // this.$message.success('哈哈哈哈')
        if (res.data.result && res.data.result.length > 0) {
          this.totalcount = res.data.totalcount
          this.list = res.data.result.map(x => {
            x.createAt = Coms.getCommonTime(x.createAt)
            return x
          })
          // loadingInstance.close()
          return 'ok' // 下一个方法的 结果
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
    this.getLatestArticles()
    sr.reveal(document.querySelectorAll('.album-face'))
  }
}
</script>
<style type="text/css">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 1300px){
  .lastest{
    display: none
  }
}
.articles{
  padding-bottom: 60px;
}
.right-contents{
  width: 240px;
  margin-left: 10px;
}
.album-face{
  width: 200px;
  height: 248px;
  overflow: hidden;
  position: relative;
}
.hide-over{
  position: absolute;
  background-color: rgba(251,206,136,0.85);
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  color: #fff;
}
.hide-text{
  width: 100%;
  height: 100%;
}
.photo-num{
  position: absolute;
  right: 14px;
  bottom: 7px;
  font-size: 18px;
  color: #fff;
}
.album-face-img, .videos-face-img{
  width: 200px;
}
.album-face-img, .videos-face-img{
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0 0 5px rgba(255,255,255,0.5);
  transition: all 0.8s;
}
.album-face:hover .hide-over{
  display: block;
}
.album-face:hover .album-face-img{
  transform: rotate(-5deg) scale(1.5);
}
</style>
