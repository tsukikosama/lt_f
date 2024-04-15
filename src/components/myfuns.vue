<template>
  <div class="mycontent">
    <h4>全部关注</h4>
    <div>
        <div class="rank_item" v-for="item,index in funs.records" :key="index" @click="toself(item)">
                <!-- 头像  -->
                <div class="rank_left">
                    <div class="rank_left">
                        <el-avatar :size="50" shape="square"
                        :src="item.user.avatar" fit="cover"   ></el-avatar>

                        <div class="rank_info">
                            <!-- nickname -->
                                <el-span>
                                    {{ item.user.nickname }}
                                </el-span>
                                <!-- 签到时间 -->
                                <el-span>
                                    {{item.user.state}}
                                </el-span>
                        </div>
                    </div>

                   <!-- 内容 -->
                   <div class="rank_right">
                    <el-button v-if="item.follow === 1" icon="el-icon-plus" type="success" @click.stop="like(item,index)">已关注</el-button>
                    <el-button v-else icon="el-icon-plus"  @click.stop="like(item,index)">未关注</el-button>
                    </div>

                </div>




                <el-divider></el-divider>
            </div>
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"

                    :total="funs.total">
                </el-pagination>
            </div>
    </div>

  </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name:'myfuns',
    data(){
        return{
            funs:[],
            user:{}
        }
    },
    methods:{
        init(val){
            if(this.$store.state.user == undefined){
                this.$message.error("未登录查询失败");
                return ;
            }
            let s = this.$route.query.uid;
            if(s == undefined){
                s = this.$store.state.user.uid
            }
            request.get('/funs/'+val +"/"+s).then((res) =>{
                this.funs = res.data
            }).catch((e) =>{
                this.$message.error("查询失败")
            })
        },
        like(val,index){

            request.post('/funs/like/'+val.user.uid+'/'+this.$store.state.user.uid).then((res) =>{
                this.funs.records[index].follow = this.funs.records[index].follow^1;
            }).catch((e) =>{
                console.log("服务器繁忙")
            })

        },
        toself(item){
            // console.log(item);
            this.$router.push({name:'person',query:item.user})
        }
    },
    mounted(){
        this.init(0);
        this.user = this.$route.query
    }
}
</script>

<style scoped>
    .mycontent{
        /* width: 60vw; */
        margin: 10px ;
        background: white;
        min-height: 600px;

    }
    h4{
        padding: 10px;
        margin: 0px;
    }
    .ranking{
        max-width: 18vw;

    }
    .ranking h3{
        margin: 0px;
        /* padding: 5px; */
    }

    .item{
        /* display: flex; */
        border-bottom: 1px solid #DCDFE6;
    }
    .item .left{
        display: flex;
        /* width: 5vw; */

    }
    .bot{
        width: 100%;
    }
    .bot el-span{
        display: block;
    }
    .bot_top{
        display: flex;
        justify-content: space-between;

    }
    .bot_top el-span{
        display: block;
        padding: 5px;
    }
    .rank_left{
        display: flex;
        justify-content: space-between;
    }

    .rank_info{
        margin-left: 30px;

    }
    .rank_info el-span{
        display: block;
        padding:  5px;
    }
    .rank_left div .el-span{
        display: block;
    }
    .rank_item {
      display: flex;
      justify-content: space-between;
      padding: 5px;
      margin-top: 5px;
      flex-direction: column;
    }


    .rank_right .el-button{
        /* padding: 0px; */
        /* width: 50px; */
        float: right;
    }
    .el-divider{
        margin: 10px;
    }
    .page{
        text-align: center;
        padding: 5px;
    }
</style>
