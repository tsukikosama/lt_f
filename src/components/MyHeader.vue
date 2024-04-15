<template>
  <div class="mycontent">
    <el-menu :default-active="activeIndex" router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">话题</el-menu-item>



    <el-menu-item  ><el-button type="primary" @click.stop="add()">发表</el-button></el-menu-item>
    <el-menu-item v-if="this.$store.state.user == undefined">
      <el-span @click="login"  >登录</el-span>&emsp;
    </el-menu-item>
      <el-menu-item  v-else>
        <el-span @click="login" >{{this.$store.state.user.username}}</el-span>&emsp;

      </el-menu-item>
    <el-menu-item v-if="this.$store.state.user == undefined">
      <el-span @click="reg()"  >注册</el-span>
    </el-menu-item>
    <el-menu-item  v-else>
      &emsp;<el-span @click="logout()">退出</el-span>
    </el-menu-item>
    </el-menu>


    <div>

    </div>

    <!-- <div class="line"></div> -->
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
    name:'myheader',
    data() {
      return {
        key:''
      };
    },
    methods: {

      login(){
        this.$router.push({path:'/login'})

      },
      reg(){
        this.$router.push({path:'/reg'})
      },
      logout(){
        this.$store.commit('logout')
        localStorage.removeItem('user')
      },
      init(){

      },
      add(){
        if (this.$store.state.user == undefined || this.$store.state.user == ''){
          this.$message.error("只有登录过后才可以发布文章")
          return;
        }
        this.$router.push({path:'/add'})
      },
      search(){
        this.$router.push({path:'/search'})
      }
    },
    mounted() {

    },
}
</script>

<style scoped>
    .mycontent{
        /* width: 100vw; */
        /* display: flex; */
    }

    .el-menu-item:nth-of-type(2){
        margin-left: 60vw;
    }
    .el-menu-item:first-of-type{
        margin-left: 10vw;
    }
</style>
