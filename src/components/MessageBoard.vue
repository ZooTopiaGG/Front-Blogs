<template>
  <section class="flex">
    <div class="program flex-1 left-content">
      <div class="title flex flex-align-center">
        <icon name="comment" scale="1.2" style="color:#00AACD"></icon>
        <span class="title-text">留言板</span>
        <span class="title-label">Message Board</span>
      </div>
      <div class="boards bgbox box">
        <div class="boards-title">
          站长寄语
        </div>
        <div class="boards-message">
          <div class="flex flex-pack-center img-groups">
            <img src="http://scenery.55lover.com/image/scenery/psb.jpg">
            <img src="http://scenery.55lover.com/image/scenery/psb.webp">
          </div>
          <div class="text-groups">
            <p style="color:#e91631">温馨的留言充满着幸福的期待，</p>
            <p style="color:#31859b">珍藏的回忆是永不褪色的色彩，</p>
            <p style="color:#ffff00">心灵的快乐是因为有你的存在，</p>
            <p style="color:#62b44b">深深的牵挂凝聚着真挚的情怀，</p>
            <p style="color:#eec311">但愿朋友祝福常有，友情同在！</p>
            <p style="text-shadow: 1px 0 4px #ff0000, 0 1px 4px #ff0000, 0 -1px 4px #ff0000, -1px 0 4px #ff0000; color: #fff;">留下你的足迹吧！ </p>
          </div>
        </div>
        <ul class="boards-list">
          <li class="flex bg bgbox boards-list-cell" v-for="(item, index) in lists" :key="index">
            <img v-if="item.avatar" class="user-avatar" :src="item.avatar">
            <img v-else class="user-avatar" src="../assets/images/23115938.jpg">
            <div class="boards-cell-content flex flex-1 flex-v">
              <div class="flex flex-align-center">
                <span class="user-name">{{ item.username }}</span>
                <span class="grey-text">第{{ item.messageid }}楼</span>
              </div>
              <div class="flex-1 content flex">{{ item.content }}</div>
              <div class="grey-text">
                <span>{{ item.createAt }}</span>
                <!-- <a href="javascript:;" class="reply" @click="replyBtn(index)">回复</a> -->
              </div>
              <!-- 回复列表 -->
              <ul class="reply-list">
                <li class="reply-list-cell flex flex-align-top" v-for="(replyitem, replyindex) in item.replyList" :key="replyindex">
                  <img v-if="replyitem.fromavatar" class="reply-avatar" :src="replyitem.fromavatar">
                  <img v-else class="reply-avatar" src="../assets/images/23115938.jpg">
                  <div class="flex flex-v reply-box">
                    <span class="reply-content"><span style="color: #18acff;margin-right:4px;">{{replyitem.fromusername}}</span>{{replyitem.tovalue}}</span>
                    <span class="reply-time">{{ replyitem.createAt | time }}</span>
                  </div>
                </li>
              </ul>
              <div>
              </div>
                <div class="transition-box">
                  <el-input type="textarea" class="reply-textarea" v-model="item.value" @focus="replyBtn(index)" :placeholder="item.placeholder" :rows='item.rows'></el-input>
                  <!-- <el-input type="textarea" class="reply-textarea" :rows='3'></el-input> -->
                  <el-collapse-transition>
                    <div v-show="item.show">
                      <el-button type="primary" @click="confirm(index, item.userid, item.username, item.id, item.value)">确定</el-button>
                      <el-button type="primary" @click="cancel(index)">取消</el-button>
                    </div>
                  </el-collapse-transition>
                </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="block">
        <!-- <span class="demonstration">完整功能</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[6, 12, 18, 24]"
          :page-size="6"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalcount"
          class="page">
        </el-pagination>
      </div>
      <div class="writeMessage title flex flex-align-center box" style="padding: 6px 20px">
        <span class="flex flex-align-center"><icon name="edit" scale="1.2" style="color:#00AACD;margin-right:2px;margin-top:3px;"></icon> 留下你的足迹吧！</span>
        <span @click="show=!show" class="showit" style="margin-left: 15px;"><a href="javascript:;" v-if="show">收起</a><a href="javascript:;" v-else>我要留言</a></span>
      </div>
      <!-- 表单 -->
      <el-collapse-transition>
        <div v-show="show" class="transition-box">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="0" class="boards-ruleForm bgbox">
          <el-form-item prop="website">
            <el-input type="textarea" v-model="ruleForm.message" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <div class="nosign" v-if="!GET_LOGIN_STATUS">
            <router-link :to="{ name: 'signin' }">还未登录？去登录</router-link> 
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">发布留言</el-button>
          </el-form-item>
        </el-form>
        </div>
      </el-collapse-transition>
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
import { mapGetters } from 'vuex'
import Vue from 'vue'
Vue.filter('time', function (val) {
  return Coms.createTime(val)
})
export default {
  name: 'program',
  data () {
    return {
      show: false,
      show1: false,
      list: [],
      currentPage4: 1,
      totalcount: 200,
      pagesize: 6,
      page: 1,
      logo: 'this.src="http://file.55lover.com/uploads/aff0d0293f71.jpg"',
      ruleForm: {
        message: '',
      },
      rules: {
        message: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 1, max: 250, message: '长度在 1 到 250 个字符', trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    ...mapGetters([
      'GET_LOGIN_STATUS'
    ]),
    lists () {
      var arr = []
      this.list.forEach((val, i) => {
        // val.value = this.value // 返回的不是observe对象
        this.$set(val, 'value', '') // 返回的是observe对象 ,深入响应式
        this.$set(val, 'show', false) // 返回的是observe对象 ,深入响应式
        this.$set(val, 'rows', 1) // 返回的是observe对象 ,深入响应式
        this.$set(val, 'placeholder', '我也说一句') // 返回的是observe对象 ,深入响应式
        // val.createAt = Coms.getCommonTime1(val.createAt)
        arr.push(val)
      })
      return arr
    }
  },
  components: {
    Asides,
    Icon
  },
  methods: {
    // 点击显示回复框
    replyBtn(index) {
      if (this.GET_LOGIN_STATUS) {
        this.$set(this.lists[index], 'show', true)
        this.$set(this.lists[index], 'placeholder', '')
        this.$set(this.lists[index], 'rows', 3)
      } else {
        this.$message.warning('未登录或登录信息已过期')
      }
    },
    // 取消留言
    cancel(index) {
      this.$set(this.lists[index], 'value', '')
      this.$set(this.lists[index], 'show', false)
      this.$set(this.lists[index], 'placeholder', '我也说一句')
      this.$set(this.lists[index], 'rows', 1)
    },
    // 确认留言
    confirm(index, touserid, tousername, toid, tovalue) {
       if (!tovalue) {
          this.$message.error('回复内容不能为空')
          return
        }
      // from 登录者信息
      var para = {
        //登录者id
        fromuserid: this.GET_LOGIN_STATUS.id,
        fromusername: this.GET_LOGIN_STATUS.name,
        fromavatar: this.GET_LOGIN_STATUS.avatar,
        touserid: touserid,
        tousername: tousername,
        toid: toid,
        tovalue: tovalue
      }
      axios.post('/api/replyMessage', Qs.stringify(para))
      .then(res => {
        this.lists[index].replyList.push(res.data.result)
        this.$message.success(res.data.message)
        this.cancel(index)
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMessage()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSizeChange (val) {
      // 每页多少条
      this.pagesize = val
      this.getMessages()
    },
    handleCurrentChange (val) {
      // 当前页数
      this.page = val
      this.getMessages()
    },
    // 发布留言
    addMessage () {
      var self = this
      if (!self.GET_LOGIN_STATUS) {
        self.$message.warning('未登录或登录信息已过期')
        return
      }
      if (!self.ruleForm.message) {
        self.$message.error('发布内容不能为空')
        return
      }
      var para = {
        userid: self.GET_LOGIN_STATUS.id,
        username: self.GET_LOGIN_STATUS.name,
        avatar: self.GET_LOGIN_STATUS.avatar,
        content: self.ruleForm.message
      }
      axios.post('/api/addMessage', Qs.stringify(para))
      .then(res => {
        res.data.result.createAt = Coms.createTime(res.data.result.createAt)
        self.list.unshift(res.data.result)
        self.ruleForm.message = ''
      })
      .catch(err => { console.log(err) })
    },
    // 获取留言列表
    getMessages () {
      var para = {
        page: this.page,
        pagesize: this.pagesize
      }
      axios.post('/api/getMessages', Qs.stringify(para))
      .then(res => {
        this.totalcount = res.data.totalcount
        let r = res.data.result.map(x => {
          x.createAt = Coms.createTime(x.createAt)
          return x
        })
        this.list = res.data.result
      })
      .catch(err => { console.log(err) })
    }
  },
  mounted () {
    // console.log(this.GET_LOGIN_STATUS)
    $('title').html('留下你的足迹吧_留言板_邓鹏博客')
    this.getMessages()
  }
}
</script>
<style type="text/css">
  .boards-ruleForm .el-form-item__label{
    font-size: 16px;
    color: #222;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.program{
  padding-bottom: 60px;
}
.img-groups>img{
  width: 400px;
  height: 400px;
}
.text-groups {
  text-align: center;
  margin-top: 30px;
}
.boards-title {
  margin-bottom: 15px;
  color: #000
}
.boards-list{
  margin-top: 55px;
}
.boards-list-cell{
  padding: 10px;
}
.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
.boards-cell-content {
  padding-right: 5px;
}
.content{
  height: 117px;
}
.grey-text {
  color:#9B9B9B;
  font-size: 12px
}
.user-name {
  margin-right: 15px;
}
.content {
  font-size: 13px;
  color: #444;
  margin-top: 5px;
  flex-wrap: wrap;
  text-align: justify;
}
.boards-ruleForm{
  padding: 42px 20px 20px;
  position: relative;
  opacity: 1 !important;
}
.nosign {
  position: absolute;
  left: 140px; 
  top: 168px;
  z-index: 9;
  cursor: pointer;
}
.writeMessage{
  margin-top: 20px;

}
.showit>a:hover, .reply:hover{
  text-decoration: underline;
}
.reply{
  margin-left: 10px;
}
.reply-textarea {
  margin:0 0 15px 0;
}
.reply-list {
  margin-top: 6px;
  border-top: 1px solid #18aacf;
  padding: 10px 0;
}
.reply-list-cell{
  margin-bottom: 10px;
}
.reply-box{
  font-size: 12px;
  color: #9B9B9B;
  margin-left: 8px;
  width: 444px;
}
.reply-content {
  color: #444;
}
.reply-avatar {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.transition-box {
  transition: all 0.3s;
}
</style>
