<template> 
  <section class="flex">
    <div class="articles left-content flex flex-v flex-1" id="articles">
      <div class="title flex flex-align-center">
        <icon name="photo" scale="1.2" style="color:#00AACD"></icon>
        <div>
          <span class="title-text">相册专栏</span>
          <span class="title-label">Album column</span>
        </div>
      </div>
      <article class="album-list flex flex-v flex-1" ref="imgs">
        <!-- <div class="album-list-cell" v-for="(item, index) in list" :key="index">
          <img :src="item.personsrc" width="200px">
        </div> -->
        <ul ref='ul' class="flex flex-pack-justify" style="width: 100%; position: relative"></ul>
      </article>
      <div class="block">
        <!-- <span class="demonstration">完整功能</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[30, 40, 50, 60]"
          :page-size="30"
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
  name: 'articles',
  data () {
    return {
      list:[],
      // 当前页
      currentPage4: 1,
      // 总条数
      totalcount: 200,
      // 每页多少条
      pagesize: 30,
      // 页值
      page: 1,
      //
      li_num: 0,
      // 
      _ul: ''
    }
  },
  components: {
    Asides,
    Icon
  },
  mounted () {
    $('title').html('美丽无须多言_相册专栏_邓鹏博客')
    this.getPersonAlbum()
  },
  methods: {
    lookMore (id) {
      this.$router.push({ name: 'adetails', params: { articleid: id, type: 'a' } })
    },
    handleSizeChange (val) {
      // 每页多少条
      // console.log(val)
      this.pagesize = val
      let _ul = this.$refs.ul
      _ul.innerHTML = ''
      this.getPersonAlbum()
    },
    handleCurrentChange (val) {
      // 当前页数
      this.page = val
      // 清空ul
      let _ul = this.$refs.ul
      _ul.innerHTML = ''
      this.getPersonAlbum()
    },
    getPersonAlbum () {
      let self = this
      let para = {
        page: self.page,
        size: self.pagesize,
        albumtype: -1// 照片分类
      }
      axios.post('/api/getPersonAlbum', Qs.stringify(para))
      .then(res => {
        self.list = res.data.result
        self.totalcount = res.data.total
        // console.log(this.list)
        let _ul = self.$refs.ul
        let _imgs = self.$refs.imgs
        // 计算一排可以放多少个li 每个li 200px
        let li_num = 5
        let li_width = _ul.clientWidth / li_num
        // 初始化li个数和img图片
        for (let i=0; i< li_num; i++) {
          let left = li_width * i
          _ul.innerHTML += `<li class="album-list-cell" style="width: ${li_width}px; position: absolute; left:${left}px; font-size:0;">
            <img src="${self.list[i].personsrc}" width="${li_width}px" style="box-sizing:border-box; border:2px solid #fff;">
          </li>`
        }
        return 'ok'
      })
      .then(res => {
        let _ul = self.$refs.ul
        let li_num = 5
        let li_width = _ul.clientWidth / li_num
        function findSmallIndex() {
          // body...
          var minLiHeight = _ul.children[0].clientHeight
          let min = 0
          for (let i=0; i< li_num; i++) {
            if ( _ul.children[i].clientHeight < minLiHeight ) {
              minLiHeight = _ul.children[i].clientHeight
              min = i
            }
          }
          return min
        }
        for (let j = 4; j< self.list.length; j++) {
          let smallest = findSmallIndex()
          _ul.children[smallest].innerHTML += `<img src="${self.list[j].personsrc}" width="${li_width}px" style="box-sizing:border-box; border:2px solid #fff;">`
        }
        
      })
      .catch(err => {})
    },
  }
}
</script>
<style type="text/css">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articles{
  padding-bottom: 60px;
}
.album-list{
  flex-wrap: wrap;
  padding-top: 20px;
}
</style>
