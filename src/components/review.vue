<template>
    <div>
        <div class="chat">
          <div class="item" v-for="(item,index1) in this.reviews" :key="index1">
              <div class="chat-content">
                <!-- 左 -->
                <div>
                  <div class="myavt">
                    <el-avatar :size="70" :src="item.usericon"></el-avatar>
                  </div>
                </div>
                <!-- 右边 -->
                <div  class="chat-right" >
                    <!-- 名字 -->
                    <el-span>{{item.username}}</el-span>
                    <!-- 内容 -->
                    <el-span>{{item.content}}</el-span>
                    <!-- 时间 -->
                    <div><el-span>{{item.time}}</el-span><el-span>
                    <i  @click="like(index1)" :class="item.flag?'el-icon-star-on':'el-icon-star-off'">{{item.likes}} </i>
                    <!-- <i v-else  @click="like()" class="el-icon-star-on"></i> -->
                  </el-span>
                  <el-span @click="review(item)">&nbsp;回复</el-span></div>
                </div>
              </div>

              <!-- 子评论 -->
              <div  v-for="(reply,index2) in item.replays" :key="index2" style="display: flex;margin-left: 70px;">
                <!-- 左 -->
                <div class="chat-content">
                  <div >
                  <div class="myavt">
                    <el-avatar :size="70" :src="reply.usericon"></el-avatar>
                  </div>
                </div>
                <!-- 右边 -->
                <div >
                   <div class="chat-right">
                     <!-- 名字 -->
                    <el-span>{{reply.username}}</el-span>
                      <!-- 内容 -->
                      <el-span>{{reply.content}}</el-span>
                   </div>
                    <!-- 时间 -->
                    <div class="chat-reply">
                      <el-span>{{item.time}}</el-span><el-span>
                    <i  @click="like(index1)" :class="item.flag?'el-icon-star-on':'el-icon-star-off'">{{item.likes}} </i>
                    <!-- <i v-else  @click="like()" class="el-icon-star-on"></i> -->
                    </el-span>
                    <el-span @click="review(item)">&nbsp;回复</el-span>
                  </div>
                </div>
                </div>
              </div>
          </div>
      </div>

          <!-- 回复框 -->
          <div class="submits">
                <div  class="rev" >
                  <div class="myavt">

                    <el-avatar :size="60" class="myrev" :src="user == undefined ? '' : user.userIcon"></el-avatar>
                  </div>

                <div class="t" >
                  <el-input   type="text" class="input" placeholder="请输入你要回复的内容..只有登录后才可以评论哦!" v-model="reply" ></el-input>
                  <el-button class="submit" type="success" @click="sumbit()">发表</el-button>
                </div>
              </div>
            </div>
    </div>



</template>

<script>
export default {
    data(){
        return{
            flag: false,
            likes:1,
            //recover:true,
            reply:"",
            reviews : {},
            replycontent:{},
            replyid: -1,
            // isreply:2,
            bloginfo:null,
            user:''
        }
    },
    methods:{
        like(index1,index2){
          // console.log(index1)
          // console.log(index2);
          // console.log("eeeeeeeeeeeeeeeeeeee")
          let user = localStorage.getItem("user");

          if(user == undefined){
            this.$message.error("没登陆禁止点赞");
            return;
          }
          // 判断是否有登录
          user = JSON.parse(user);
          // console.log(user);
          user = user.user;
          let t;
          //判断点赞的是父评论，还是子评论
          if(index2 == undefined){
            if(this.reviews[index1].flag){
              this.reviews[index1].likes--;
            }else{
              this.reviews[index1].likes++;
            }
            this.$set(this.reviews[index1],"flag",!this.reviews[index1].flag)
            t = this.reviews[index1].id;
          }else{
            console.log(this.reviews[index1].replays[index2])
            if(this.reviews[index1].replays[index2].flag){
              this.reviews[index1].replays[index2].likes--;
            }else{
              this.reviews[index1].replays[index2].likes++;
            }
            // this.$set(this.reviews[index1].replays[index2].flag,"flag",!this.reviews[index1].replays[index2].flag)'
            this.reviews[index1].replays[index2].flag = !this.reviews[index1].replays[index2].flag;
            t = this.reviews[index1].replays[index2].id;
          }
          // console.log(this.reviews[t-1].flag)
          // if(this.reviews[t-1].flag){
          //   this.reviews[t-1].likes--;
          // }else{
          //   this.reviews[t-1].likes++;
          // }
          // this.reviews[t-1].flag = !this.reviews[t-1].flag
          // console.log(this.reviews[t-1])
          // console.log(this.reviews[t-1])
          //判断当前是赞还是没赞
          // this.reviews[t-1].flag = !this.reviews[t-1].flag;
          // this.$set(this.reviews[t-1].flag,"flag",!this.reviews[t-1].flag);
          // console.log(this.$route.query.id)
          // console.log(user.uid)
          // console.log("eeee")

          request.post("review/islike?bid="+this.$route.query.id+"&uid="+user.uid+"&rid="+t).then((res) =>{
            console.log(res.data);
          }).catch((e) =>{
            this.$message.error("点赞失败")
            console.log(e)
          })
        },

        review(res){
          console.log(res);
          // this.recover = true;

          //回复的id
          this.replyid = res.id;
          // console.log(obj);
          //显示回复窗口

          // console.log(this.reviews[this.replyid])

        },

        sumbit(){

          for(let key of Object.keys(this.replycontent)){
              console.log(key)
              this.replycontent[key] = "";
          }
          // console.log("wwwww")

          //设置内容
          this.$set(this.replycontent,"content",this.reply);

          //设置属于那个博客
          this.$set(this.replycontent,"bid",Number(this.id));

          this.$set(this.replycontent,"flag",false);
          //获取用户名
          let u = localStorage.getItem("user");
          if(u == null){
            this.$message.error("请登录后在评论吧")
          }
          this.$set(this.replycontent,"username",JSON.parse(u).user.username)
          // console.log(u)
          this.$set(this.replycontent,"rid",null);

          //设置回复的时间
          this.$set(this.replycontent,"time",new Date().toLocaleString())
          //设置默认赞的数量
          this.$set(this.replycontent,"likes",0);
          this.$set(this.replycontent,"replays",[]);
          this.$set(this.replycontent,"reply",0);
          this.$set(this.replycontent,"usericon",JSON.parse(u).user.userIcon)
          console.log(JSON.parse(JSON.stringify(this.replycontent)));
          // console.log(obj)
          for(let i = 0 ; i < this.reviews.length ; i++){
            if(this.reviews[i].id == this.replyid){
              this.$set(this.replycontent,"reply",1);
              this.$set(this.replycontent,"rid",this.replyid);
              // this.$set(this.replycontent,"flag",false);
              this.$set(this.reviews[i].replays,this.reviews[i].replays.length,JSON.parse(JSON.stringify(this.replycontent)))
              // this.reviews[i].replays.push(JSON.parse(JSON.stringify(this.replycontent)));
              console.log(this.reviews[i]);
            }
          }


          if(this.replyid == -1){
            this.$set(this.reviews,this.reviews.length,JSON.parse(JSON.stringify(this.replycontent)))
          }
          // console.log(obj)


          request.post('/review/addreview',this.replycontent).then((res) => {
            this.$message.success(res.data)
          }).catch((e) => {
            console.log(e);
          })


          this.reply = "";
          this.replyid = -1;
          // this.recover = false;
        },
        //弃用
        // handleScroll(){
        //     let scrollTop = document.documentElement.scrollTop;//滚动高度
        //     let clientHeight = document.documentElement.clientHeight;//可视高度
        //     let scrollHeight = document.documentElement.scrollHeight;//内容高度

        //     if(scrollTop + clientHeight +100  > scrollHeight){
        //       this.recover = true
        //     }else{
        //       this.recover = false;
        //     }
        // },



    },

    created(){
      console.log(this.$route.query.item)

        this.bloginfo = this.$route.query.item;


        this.id = this.$route.query.id;

         request.get("/blog/"+this.id).then((res) =>{

            this.blog = res.data
             this.content = marked.parse(res.data.content)
            }).catch((e) =>{
              this.$message.error("查询失败" + e)
          })
    },
    mounted(){
      // window.addEventListener("scroll", this.handleScroll, true);

      let bid = this.$route.query.id;
      request.get('/review/findall?bid='+bid).then((res) =>{
        // console.log(res.data)
        for(let i = 0 ; i < res.data.length ;i++){
            res.data[i].flag = false;
        }
        // console.log(res.data)
        this.reviews = res.data
      }).catch((e) => {
        console.log(e)
      });
      let user = localStorage.getItem("user");

      user = JSON.parse(user);
      user = user.user;
      if(user != null){
        // this.recover = false;
        this.user = user;
      }
        request.get('/review/likes?bid='+bid+"&uid="+user.uid).then((res) =>{
          //查找全部的点赞评论
          console.log(res)
          let ress = this.reviews;

          console.log(ress)
          for(let i = 0 ; i < res.data.length ; i++){
            //遍历全部的评论数据 寻找点赞的数据
            for(let j = 0 ; j < ress.length ; j++){
              if(ress[j].id == res.data[i]){
                // this.$set(ress[j])
                ress[j].flag = true;
                break;
              }
              for(let k = 0 ; k < ress[j].replays.length ; k++){
                console.log(k)
                if(ress[j].replays[k].id == res.data[i]){
                  ress[j].replays[k].flag = true;
                  break;
                }
              }

            }
            // this.set(this.reviews[i],flag,!this.reviews[i].flag)
          }
          this.reviews = ress;
        }).catch((e) =>{
          console.log(e);
          this.$message.error("点赞失败请稍后再试。")
        })
    },
}
</script>

<style scoped>
    .block{
  margin-top:3%;
  text-align:center;
  margin-bottom: 5%;
}
.block .el-image{
   /* width: 80% !important; */
   width: 80%;
   /* height: 300px; */
   text-align:center;
   margin: 0 auto;
   /* z-index: -11; */
}
 .my-label {
    background: #E1F3D8;
  }

  .my-content {
    background: #FDE2E2;
  }

   .chat{
    margin-top: 3% ;
    width: 80%;
    margin-bottom: 5%;
    margin-left: 10%;
    /* border: solid 2px aqua; */
    /* border-radius: 10px; */
    /* border-radius: 5px;*/
    /* background-color: orange;  */
  }
  .chat-right{
    display: flex;
    flex-direction: column;
  }
  .chat-right div:first-child{

    display: inline-block;
    float: left;
  }
  .chat-right div:first-child{

    display: inline-block;
    float: ri;
  }
  .chat-right el-span:nth-child(2){
    text-indent: 12px;
  }
  .chat-content{
    display: flex;
  }
  .chat-reply el-span:nth-child(1){
      display: block;
      float: left;
  }
  .chat-reply el-span:nth-child(2){
      display: block;
      float: right;
  }



  .el-avatar{
    /* margin-right: 15px; */
  }
  .submits{

    width: 100%;
    /* margin-left: 20%; */
    margin: 0 auto;
    /* position: relative; */
    bottom: 30px;
  }
  .rev{
    display: flex;
    justify-content: center;
  }
  .input{
    width: 250px;

    /* height: 100%; */
    background: #F1F2F3;
    /* margin-left: 3% ; */
  }

  /**修改el-input的高度 */
  /deep/ .el-input__inner{
    height: 60px;
  }

  .submit{
    height: 100% !important;
    margin-left: 15px;

  }
  .t{
    display: flex;
    width: 600px;
    height: 60px;

  }
  /deep/ .el-descriptions__title{
    /* text-align: center !important;
     */
    margin: 10px auto;

    color: chocolate;
  }
  /deep/ .el-descriptions{
    /* display: flex;  */
    /* justify-content: center; */

    background: rgb(196, 222, 193);
    /* padding: 0 auto; */
    /* border-radius: 10px; */
    text-align: center !important;
  }
  /deep/.el-descriptions-item{
    background: rgb(196, 222, 193);
    padding: 5px;
    padding-left: 20px ;
    margin: 10px;
    /* border-radius: 10px; */
  }
  .bloginfo{
    /* display: flex;  */
    width:80%;
    margin-left:10%;
    margin-bottom:5%;
    /* background: aqua; */
  }
  .infotag:not(:first-child){
    margin-left: 15px;
  }
  .myavt{
    margin-right: 15px ;
    /* overflow: hidden; */
    /* background-size: 150%; */
    /* background-position-x: 50%; */
    object-fit: cover;
  }

  .item{
    margin-bottom: 15px;
  }
  @media screen and (max-width: 800px) {
    .el-avatar{
      width: 50px !important;
      height: 50px !important;
    }

    .input{
      width: 150px;
    }
  }
</style>
