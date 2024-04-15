<template>
  <div class="mycontent">

    <div  class="item" v-for="(item,index) in post.records" :key="item" @click="toPost(item)">
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
          <!--<el-span>{{时间}}</el-span>-->
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
    <div v-show="post.records.length == 0" style="text-align: center;">
      <h1>暂无收藏</h1>
    </div>
    <div v-show="post.records.length > 0" class="page" >
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
  methods: {
    collect(val){
      console.log(val)
      request.get('/post/collect/list/'+val+'?uid='+this.$store.state.user.uid).then((res) =>{
         this.post = res.data
      }).catch((e) =>{
        this.$message.error("加载失败")
      })
    },
    handleCurrentChange(val){

      this.collect(0)
    }
  },
  created(){
    this.collect(0)
  },
  updated() {
  },
  mounted() {
    // this.post = this.$route.query.searchPost
  }
}
</script>

<style scoped>
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
  max-height: 100px;
  min-height: 100px;
}
.content >>> img{
  height: 100px;
  width: 100px;
}

</style>
