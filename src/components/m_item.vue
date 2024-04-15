<template>
    <div>
      <div class="mycontent">
        <ul>
          <li   >
            <router-link to="/" exact-active-class="active">最新</router-link>

          </li>
          <li    >
            <router-link to="/likes" exact-active-class="active">推荐</router-link>
          </li>
          <li    >
            <router-link to="/visit" exact-active-class="active">排行</router-link>
          </li>
          <li >
            <router-link  to="/funs"  exact-active-class="active">关注</router-link>
          </li>
          <li >
            <router-link  to="/search"  exact-active-class="active">搜索</router-link>
          </li>
          <li >
            <router-link  to="/collection"  exact-active-class="collect">我的收藏</router-link>
          </li>
          <li >
            <router-link  to="/daily"  exact-active-class="daily">动态</router-link>
          </li>

          <el-divider></el-divider>

          <li   >
            <router-link to="/feedback" exact-active-class="active">反馈</router-link>
          </li>
        </ul>

      </div>
      <div class="mycontent2">
        <M_hot/>
      </div>
    </div>
</template>

<script>
import M_hot from "@/components/m_hot.vue";
export default {
    name:'item',
    components:{
      M_hot
    },
    data(){
        return{
            url:''
        }
    },
    methods:{
        get(){
             this.url = this.$router.path
        },
        msg(){
            this.$message.error("未登录不能访问")
        }
    },
    mounted(){
        this.url = this.$router.path
    }
}
</script>

<style scoped>
    .mycontent{
        display: flex;
        /* width: 25vw; */
        max-width: 300px;
        justify-content: center;
        margin-top: 10px;
        margin-left: 40px;
        background-color: white;
       flex-direction: column;
      align-items: center;

    }
    .mycontent ul{
        width: 20vw;

        max-width: 150px;

        list-style-type: none;
        padding: 10px;
        text-align: center;
        /* padding-left: 10px; */
        padding: 5px;

    }
    .mycontent ul li {
        display: block;
         padding: 10px;
         /* margin: 5px 0px;  */
        /* width: 20vw; */
        max-width: 150px;
         /* border: 1px solid black;  */
        border-radius: 5px;
        font-size: 18px;
        color: black;
        /* background: #EA6F5A; */
    }
    li a{
        text-decoration:none;
        color:black;
    }
    .active{
        color: white !important;
        background-color: #EA6F5A;
        display: block;
        padding: 10px;
         font-size: 18px;
        /* margin: 5px 0px; */
    }
    .el-divider{
        padding: 0px;
        margin: 0px;
    }
   .mycontent2{
     //display: flex;
     /* width: 25vw; */
     max-width: 300px;
     justify-content: center;
     margin-top: 10px;
     margin-left: 40px;
     background-color: white;
     flex-direction: column;
     align-items: center;
     margin-top: 30px;
     margin-bottom: 30px;
   }
</style>
