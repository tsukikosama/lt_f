<template>
  <div class="mycontent">
      <h1>登录</h1>
      <el-form label-position="top" label-width="80px" :model="user">
        <el-form-item label="用户名">
            <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <div class="mybtn"><el-button type="success" @click="login()">登录</el-button><el-button @click="reg()">注册</el-button></div>
      </el-form>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
    name:'login',
      data() {
      return {
       
        user: {
          username: '',
          password: '',
          
        }
      };
    },
    methods:{
        login(){
            request.post('/user/getone',this.user).then((res) =>{
                this.$store.commit('login',res.data)
                this.$message.success("登录成功")
                //存入localstorage
                localStorage.setItem('user',JSON.stringify(res.data));
                this.$router.push({path:'/'})
            }).catch((e) =>{
                this.$message.error("登录失败")
            })
        },
        reg(){
            this.$router.push({path:'/reg'})
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
</style>
<style >
    .el-form--label-top .el-form-item__label{
        padding: 0px;
    }
</style>