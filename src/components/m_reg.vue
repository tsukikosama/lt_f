<template>
  <div class="mycontent">
      <h1>注册</h1>
      <el-form label-position="top" label-width="80px" :model="regForm">
        <el-form-item label="用户名">
            <el-input v-model="regForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
            <el-input v-model="regForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" >
            <el-input v-model="regForm.checkPsd" type="password"></el-input>
        </el-form-item>
        <el-span class="myspan">邮箱</el-span>
        <div class="send">
                <el-input v-model="regForm.email"></el-input><el-button style="margin-left:10px" @click="send()">发送</el-button>
        </div>
        <el-form-item label="验证码">
            <el-input v-model="regForm.code"></el-input>
        </el-form-item>
        <div class="mybtn"><el-button type="success" @click="reg()">注册</el-button></div>
      </el-form>
  </div>
</template>

<script>
import request from '@/utils/request';

export default {
    name:'login',
      data() {
      return {
       
        regForm: {
          username: '',
          password: '',
          checkPsd:'',
          email:'',
          code:''
        },
        
      };
    },
    methods:{
        send(){
        request.post('/mail/send?address='+this.regForm.email).then((res) =>{
          this.$message.success("验证码发送成功");
        }).catch((e) =>{
          this.$message.error("邮件发送失败");
        })
      },
      reg(){
          if(this.regForm.password != this.regForm.checkPsd){
              this.$message.info("两次输入的密码不同");
              return ""
          }
          request.post('/user/reg',this.regForm).then((res) =>{
              this.$message.success("注册成功")
              this.$router.push({path:'/'})
          }).catch((e) =>{
              this.$message.error("注册失败,稍后再试")
          })
      }
    }
}
</script>

<style scoped>
    .mycontent{
        width: 25vw;
        margin: 30px auto;
        border: 1px solid #409EFF;
        border-radius: 5px;
        padding: 30px;
        min-height: 300px;
        /* background: gainsboro; */
    }
    .mycontent h1{
        text-align: center;
        /* padding-top: 10px; */
        margin: 0px;
        
    }
    .el-form-item{
        margin-bottom: 0px;
        padding: 0px;
    }
    .mybtn{
        margin-top: 10px;
        text-align: center;
    }
    .send{
        display: flex;
    }
    .send .el-button{
        display: inline-block
    }
    .myspan{

            vertical-align: middle;
            
            display:block;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
    }
</style>
<style >
    .el-form--label-top .el-form-item__label{
        padding: 0px;
    }
</style>