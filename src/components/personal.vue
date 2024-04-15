<template>
  <div class="mycontent">
    <div class="avator">
        <div>
            <el-avatar :size="110" shape="square"
                        :src="user.avatar" fit="cover"   ></el-avatar>
        </div>

        <div class="nickname">
            <el-span>{{user.nickname}}</el-span>
            <el-span>{{user.state}}</el-span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'personal',
    data(){
        return{
            user:{},
        }
    },
    methods:{

    },
    mounted() {
        this.user = this.$route.query
    },
}
</script>

<style scoped>
    .mycontent{
        width: 80vw;
        height: 300px;
        background-image: url('../assets/bj2.jpeg');
        /* background-size: 200%; */
        background-position-y:25% ;
        background-position-x: 55%;
        background-repeat: no-repeat;

        display: flex;
        align-items: flex-end;
    }
    .avator{
        display: flex;
        width: 80vw;
        background: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0.29));;

    }
    .avator div{
        height: 110px;
        width: 110px;

    }
    .nickname{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-left: 10px;
    }
    .nickname el-span{
        padding-bottom: 5px;
    }
</style>
