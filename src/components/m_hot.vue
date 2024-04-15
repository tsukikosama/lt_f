<template>
  <!-- 积分排行 -->
  <div class="ranking">
    <h3>热门帖子</h3>
    <el-divider></el-divider>
    <div class="item" v-for="item,index in hot" :key="index" @click="toself(item)">
      <!-- 头像  -->
      <div class="left">
        <el-avatar  shape="square"
           :src="item.avatar" fit="cover"   ></el-avatar>
        <div class="title">
          <!-- 标题 -->
          <el-span>
            {{ item.title }}
          </el-span>
          <!-- 签到作者 -->
          <el-span>
            {{ item.username }}
          </el-span>
        </div>
      </div>


      <!-- 内容 -->
      <div class="right">
        <div>
          <i class="el-icon-coin"></i>&nbsp;<el-span>{{ item.visit }}</el-span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name:'hot',
  data(){
    return{
      hot:[]
    }
  },
  methods:{
    init(){
      request.get('/post/hot').then((res) =>{
        // console.log(res)
        this.hot = res.data;
      }).catch((e) =>{
        this.$message.error("查询失败")
      })
    },
    toself(item){

      this.$router.push({name:'post',query:{pid:item.pid,uid:item.uid}})
    }
  },
  mounted(){
    this.user = this.$route.query;
    this.init();
  }
}
</script>

<style scoped>
.ranking{
  max-width: 18vw;
  padding: 10px;
  min-height: 300px;
  background-color: white;
  margin-top: 10px ;
}
.ranking h3{
  margin: 0px;
  padding: 5px;
}
.item{
  display: flex;
  border-bottom: 1px solid #DCDFE6;
  //justify-content: space-between;
  padding: 10px;
  align-items: center;
  justify-content: space-between
}
.item:hover{
  cursor: pointer;
}
.item .left{
  display: flex;
  /* width: 5vw; */

}
.left .el-image{

  border-radius: 10px;
}
.item .right{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title el-span{
  padding: 0 20px;
  display: block;

}
.title{
  display: flex;
  flex-direction: column;
}
.right div{

  padding: 20px;
  //margin-left: 80px;
}
.el-divider{
  margin: 5px;
}
</style>
