<template>
    <div class="mycontent">
        <!-- 签到 -->
        <div class="sign">
            <h3>签到</h3>
            <el-divider></el-divider>
            <div class="mid"> <el-span>签到数:{{this.mysign.signCount}}</el-span><el-button size="mini" @click="sign()" >签到</el-button></div>
            <div class="footer" v-show="flag"><i class="el-icon-ship"></i>&emsp;<el-span>你已经签到了{{this.mysign.score}}天</el-span></div>
        </div>

        <el-divider></el-divider>
        <!-- 排行 -->
        <div class="ranking">
            <h3>今日排行</h3>
            <el-divider></el-divider>
            <div class="item" v-for="item,index in rank" :key="index" @click="toself(item)">
                <!-- 头像  -->
                <div class="left">
                      <el-avatar  shape="square" 
                    :src="item.avatar" fit="cover"   ></el-avatar>
                </div>
                <!-- 内容 -->
                <div class="right">
                    <!-- nickname -->
                    <el-span>
                        {{item.nickname}}
                    </el-span>
                    <!-- 签到时间 -->
                    <el-span>
                        {{item.state}}
                    </el-span>
                    
                </div> 
                
            </div>
            
        </div>

        
    </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name:'sign',
    data(){
        return{
            flag:'',
            mysign:{
                score:0,
                signCount:0
            },
            rank:{}
        }
    },
    methods:{
        init(){
            request.get('/user/signsort').then((res) =>{
                this.rank = res.data;
            }).catch((e) =>{
                this.$message.error("查询失败")
            })
        },
        sign(){
            if(this.$store.state.user == undefined){
                this.$message.error("登陆才能签到")
                return;
            }
            request.post('/user/sign?uid='+this.$store.state.user.uid).then((res) =>{
                console.log(res)
                if(res.success){
                    // console.log(res);
                    this.mysign = res.data;
                    this.$message.success("签到成功");
                    this.rank.push(this.$store.state.user)
                }else{
                    this.$message.info(res.errorMsg);
                }
                
                this.flag = true;
                //存入localstorage
               
            }).catch((e) =>{
                this.$message.error("签到失败");
            })
        },
        toself(item){
            // console.log(item);
            this.$router.push({name:'person',query:item})
        }  
    },
    mounted(){
        if(this.$store.state.user != undefined){
            this.flag = true;
        }
        request.get('/user/signed/'+this.$store.state.user.uid).then((res) =>{
            // console.log(res)
            this.mysign = res.data;
            // this.$message.success()
        }).catch((e) =>{
            this.$message.error("查询失败")
        })
        this.init();
        this.user = this.$route.query
    }
}
</script>

<style scoped>
    .mycontent{
        padding: 10px;
        min-height: 400px;
        background-color: white;
        margin-top: 10px;
    }
    .sign{
        max-width: 18vw;
        /* background-color: orange; */
        /* background-color:gainsboro ; */
        
    }
    .sign h3{
        padding: 5px;
        margin: 0px;
    }
    .mid {
        display: flex;
        justify-content: space-evenly;
        padding: 10px;
    }
    .el-divider{
        margin: 5px;
    }
    .mid el-span{
        display: inline-block;
        width: 9vw;
        text-align: center;
        padding: 12px 20px;
        /* margin: 0 auto; */
    }
    .mid el-button{
        width: 9vw;
        text-align: center;
    }
    .footer{
        /* padding: 12px 20px; */
        
       
        padding: 10px;
        max-width: 18vw;
        text-align: center;
        border: solid 1px black;
        background: orangered;
    }
    .footer el-span{
        max-width: 16vw;
        display: inline-block;
        /* display: block; */
        /* background-color: orange; */
        /* border: solid 1px black; */
        font-size: 18px;
    }
    .ranking{
        max-width: 18vw;
       
    }
    .ranking h3{
        margin: 0px;
        padding: 5px;
    }
    .item{
        display: flex;
        border-bottom: 1px solid #DCDFE6;
        padding: 10px;
    }
    .item:hover{
        cursor: pointer;
    }
    .item .left{
        display: flex;
        /* width: 5vw; */
    }
    .left .el-image{
        padding: 10px;
        border-radius: 10px;
    }
    .item .right{
        display: flex;
        flex-direction: column;
        padding-left: 10px;
    }
    .right el-span{
        /* padding: 10px; */
        display: block;
     
    }
</style>