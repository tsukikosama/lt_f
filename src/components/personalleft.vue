<template>
  <div class="mycontent">
    <!-- 个人成就 -->
    <div class="top">
        <h4>个人成就</h4>
        
        <div class="item">
            <div>
                <el-span>积分</el-span>
                <el-span>{{ info.xp }}</el-span>
            </div>
            <div>
                <el-span>话题</el-span>
                <el-span>{{ info.posts.length }}</el-span>
            </div>
            <div>
                <el-span>评论</el-span>
                <el-span>{{ info.replys }}</el-span>
            </div>
            <div>
                <el-span>粉丝</el-span>
                <el-span>{{ info.funs.length }}</el-span>
            </div>
        </div>
    </div>
    <div class="mid">
        <div>
            <h4 >个人资料</h4>
            <el-span v-if="this.user.username === this.$store.state.user.username" @click="edit()" class="edit">修改信息</el-span>
        </div>
        <el-divider></el-divider>
        
        
        <div>
            <el-span >昵称</el-span>
            <el-span>{{user.nickname}}</el-span>
        </div>
        <el-divider></el-divider>
        <div>
            <el-span>签命</el-span>
            <el-span>{{user.state}}</el-span>
        </div>
        
        <el-divider></el-divider>
    </div>
    <div class="bot">
        <div class="bot_top">
            <el-span >相同粉丝</el-span>
            <el-span @click="more()" class="more">他的粉丝</el-span>
        </div>

        <div class="ranking">
            
            <!-- <el-divider></el-divider> -->
            
            <div  class="rank_item" v-for="item,index in same"  :key="index" >
                <!-- 头像  -->
                <div class="rank_left">
                      <el-avatar  
                    :src="item.user.avatar" fit="cover"   ></el-avatar>
                 
                   <div class="rank_info">
                     <!-- nickname -->
                        <el-span>
                            {{item.user.nickname}}
                        </el-span>
                        <!-- 签到时间 -->
                        <el-span>
                            {{ item.user.state }}
                        </el-span>
                   </div>
                    
                 
                </div>
                <!-- 内容 -->
                
                <div class="rank_right">
                    <el-button size="mini" icon="el-icon-plus" v-if="item.follow == 1" type="success" @click.stop="like(item,index)">取消关注</el-button>
                    
                </div>
                
            </div>
            

           
        </div>

    </div>
        <div>
            <el-dialog title="个人信息" :visible.sync="dialogFormVisible" center="">
                <el-form :model="form">
                    <el-form-item label="用户名:" :label-width="formLabelWidth">
                        <el-input v-model="form.nickname" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="邮箱:" :label-width="formLabelWidth">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="个人签名:" :label-width="formLabelWidth">
                        <el-input v-model="form.state" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="头像:" :label-width="formLabelWidth">
                        <el-upload
                            class="upload-demo"
                            action="http://127.0.0.1:8088/upload"
                            :on-success="upload">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name:'personalleft',
    data(){
        return{
            user:{},
            info:{},
            dialogFormVisible: false,
            form: {
                
            },
            same:{},
            formLabelWidth: '80px'
        }
    },
    methods:{
        init(val){
            request.get('/user/getinfo/'+val).then((res) =>{
                this.info = res.data;
            }).catch((e) =>{
                this.$message.error("查询失败")
            })
        },
        like(val,index){
                if(this.user.username === this.$store.state.user.username){
                    this.follow(this.$store.state.user.uid,val.user.uid,index)
                }else{
                    this.follow(val.user.uid,this.$store.state.user.uid,index)
                } 
                
        },
        follow(val,val2,index){
            request.post('/funs/like/'+val+'/'+val2).then((res) =>{
                
                this.same.splice(index,1);
                }).catch((e) =>{
                    this.$message.error("服务器繁忙")
                })   
        },
        more(){
            
            this.$router.push({name:'funs',query:this.user})
        },
        edit(){
            this.dialogFormVisible = true;
            let item = JSON.parse(JSON.stringify(this.user))
            this.form = item
        },
        upload(response,file, fileList) {
            console.log(response)
            this.form.img = response.data
            this.$message.success("成功")
        },
        samefuns(val){
            request.get('/funs/same/'+this.$store.state.user.uid + '/' + val).then((res) =>{
                this.same = res.data;
            }).catch((e) =>{
                this.$message.error("查询失败");
            })
        },
        toself(item){
            // console.log(item.user);
            this.$router.push({name:'person',query:item.user})
            
        }  
    },
    mounted(){
        this.user = this.$route.query
        this.init(this.user.uid);
        this.samefuns(this.user.uid)
        
    }
}
</script>

<style scoped>
    .mycontent{
        width: 20vw;
        background-color: white;
        margin-top: 20px ;
    }
    h4{
        margin: 0px;
        padding: 10px;
    }
    .el-divider{
        margin: 3px 0px;
        
    }
    .item{
        display: flex;
    }
    .item div{
        width: 25%;
        text-align: center;
    }
    .item div el-span{
        display: block;
        padding: 3px;
    }
    .mid{
        width: 20vw;
    }
    /* mid */
    .mid div{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    .mid div el-span{
        display: block;
        padding: 5px;
    }

    .ranking{
        max-width: 20vw;
       
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
        min-height: 300px;
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

    }
    .rank_left .el-avatar{
        padding: 0px;
    }
    .rank_info{
        padding:  0px 5px;
    }
    .rank_left div .el-span{
        display: block;
    }
    .rank_item {
      display: flex;
      justify-content: space-between;
      padding: 5px;
      align-items: center;
      
    }
    
    
    .rank_right .el-button{
        /* padding: 0px; */
        float: right;
    }
    .bot_top :last-child{
        cursor: pointer;
    }
    .edit:hover{
        cursor: pointer;
    }
    .el-dialog .el-input {
        width: 350px;
    }
    .more{
        color: #409EFF;
    }
</style>