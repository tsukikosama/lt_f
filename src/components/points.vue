<template>
  <!-- 积分排行 -->
  <div class="ranking">
            <h3>积分</h3>
            <el-divider></el-divider>
            <div class="item" v-for="item,index in point" :key="index" @click="toself(item)">
                <!-- 头像  -->
                <div class="left">
                      <el-avatar  shape="square" 
                    :src="item.avatar" fit="cover"   ></el-avatar>
                </div>
                    <div class="title">
                        <!-- nickname -->
                        <el-span>
                               {{item.nickname}}
                        </el-span>
                            <!-- 签到时间 -->
                         <el-span>
                               {{item.state}}
                        </el-span>
                    </div>    
                
                <!-- 内容 -->
                <div class="right">
                    <div>
                        <i class="el-icon-coin"></i>&nbsp;<el-span>{{item.xp}}</el-span>
                    </div>              
                </div> 
                
            </div>
            
        </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name:'points',
    data(){
        return{
            point:{}
        }
    },
    methods:{
        init(){
            request.get('/user/sortbyxp').then((res) =>{
                // console.log(res)
                this.point = res.data;
            }).catch((e) =>{
                this.$message.error("查询失败")
            })
        },
        toself(item){
            // console.log(item);
            this.$router.push({name:'person',query:item})
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
        justify-content: space-between;
        padding: 10px;
        align-items: center;
    }
    .item:hover{
        cursor: pointer;
    }
    .item .left{
        display: flex;
        /* width: 5vw; */
        
    }
    .left .el-image{
        /* padding: 10px; */
        border-radius: 10px;
    }
    .item .right{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .title el-span{
        /* padding: 10px; */
        display: block;
     
    }
    .title{
        display: flex;
        flex-direction: column;
    }
    .right div{
        display: block;
        padding: 20px;
    }
    .el-divider{
        margin: 5px;
    }
</style>