<template>
  <div class="mycontent">
    <div class="mysearch" >
      <el-input placeholder="搜索..." class="mysearch" v-model="key"></el-input><el-button  @click="search()" type="primary" size="mini">搜索</el-button>
    </div>
    <div  class="item" v-for="(item,index) in post" :key="item" @click="toPost(item)">
      <!-- left -->
      <div class="left">
        <!-- <el-image class="avator" :src="item.avatar"></el-image> -->
        <el-avatar :size="50" shape="square"
                   :src="item.avatar" fit="cover"   ></el-avatar>
        <!-- <img :src="item.avatar" alt="" srcset="" > -->
      </div>
      <!-- right -->
      <div class="right">
        <div class="top">
          <el-span>{{item.username}}</el-span>
          <!--                <el-span>{{时间}}</el-span>-->
        </div>
        <div class="title">
          <el-span>{{item.title}}</el-span>
        </div>
        <div class="content">
          <p v-html="item.content"></p>
        </div>
        <div class="footer">
          <el-span><i class="el-icon-star-on"></i>点赞:{{item.likes}}</el-span>   <el-span><i class="el-icon-chat-dot-square"></i>评论:{{item.replycount}}</el-span>   <el-span ><i class="el-icon-tickets"></i>点击量:{{item.visit}}</el-span>

          <el-span>{{item.tag}}</el-span>
        </div>
      </div>
    </div>
    <div v-show="post.records == 0" style="text-align: center;">
      <h1>暂无文章</h1>
    </div>
    <div v-show="post.records > 0" class="page" >
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          page-size=5
          :total=post.total>
      </el-pagination>
    </div>


  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name:'content',
  data(){
    return{
      post:[],
      key:''
    }
  },
  props:{
    pre:''
  },
  methods:{
    search(){
      request.get('/post/search?key='+this.key).then((res) =>{
        this.post = res.data
        if (this.post.length == 0 ){
          this.$message.success("未查到相关文章")
        }
      }).catch((e) =>{
        this.$message.error("查询失败")
      })
    }
  },
  created(){

  },
  updated() {
  },
  mounted() {
    // this.post = this.$route.query.searchPost
  }
}
</script>

<style scoped>
.mycontent{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
}
.item{
  display: flex;
  /* width: 100%; */
  /* max-width: 40vw; */
  padding: 10px;

  margin: 10px;
  margin-top: 20px;
  background-color: antiquewhite;
}
/* .left img{
  clear: both;
  display: block;
  margin: auto;
  height: 50px;
  width: 50px;
  /* border-radius: 50px;
  /* object-fit: cover;
} */
.left{
  height: 100%;
  overflow: hidden;
}
.el-avatar {

  overflow: hidden;
}
.right{
  display: flex;
  width: 100%;
  padding-left: 10px;
  flex-direction: column;
}
.right .top{
  display: flex;
  justify-content: space-between;
  /* justify-content: space-between; */
}
.right .footer el-span:nth-child(4){
  float: right;
}
.footer el-span{
  padding-left: 5px ;
}
.page{
  text-align: center;
  margin-bottom: 20px;
}
.content{
  float: left;
}
.content p{
  overflow: hidden;
  max-height: 150px;
}
.content >>> img{
  height: 100px;
  width: 100px;
}
.mysearch{
   width: 300px;
   display: flex;
  //margin-top: 20px;
}
.mysearch .el-input{
  padding: 0px;
}
</style>
