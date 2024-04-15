<template>
  <div>
    <h1>反馈中心</h1>
    <p><el-span>在这里留下你的宝贵以见让论坛发展的更好吧</el-span></p>
    <div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 8}"
        placeholder="请输入内容"
        v-model="user.state">
      </el-input>
    </div>
    <div class="btn">
       <div>
        <el-span>留下你的联系方式:</el-span><el-input v-model="user.email"></el-input>
       <el-span>昵称:</el-span><el-input v-model="user.nickname"></el-input>
       </div>
       <div class="mybtn"><el-button type="success" @click="submit()">提交反馈</el-button></div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
   name:'feedback',
   data(){
      return{
        user:{
          state:'',
          email:'',
          nickname:'',
        }
      }
   },
   methods:{
      submit(){
        request.post('/mail/feedback',this.user).then((res) =>{
          this.$message.error("反馈成功")
          this.user.state = ''
          this.user.email = ''
          this.user.nickname = ''
        }).catch((e) =>{
          this.$message.error("反馈失败")
        })
      }
   }
}
</script>

<style scoped>
  .btn{
    display: flex;
    align-items: center;
    margin: 10px;
    justify-content: space-between;
  }
  .btn .el-input{
    width: 200px;
    padding: 5px;
  }
  .mybtn{
    display: inline;
    text-align: right;
  }
</style>