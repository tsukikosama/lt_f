<template>
    <div class="mybody">
         <div style="header" class="my_header">
             <myheader/>
         </div>
         
         <div class="container">
 
             <el-row  :gutter="24" >
                 <el-col :sm="4" :md="3"  offset="2"  >
                   
                    <personal/>
                    
                 </el-col>
                
             </el-row>
             <el-row :gutter="24">
                <el-col  :lg="2"  :offset="2">
                   
                   
                      <personalleft/>
                      
                   
                </el-col>
                <el-col :lg="15" :offset="3">
                    <M_content  pre="self"/>
                </el-col>
             </el-row>
         </div>
         
           <el-footer class="myfooter">
                
             <Footer/>
           </el-footer>
     </div>
 </template>
 
 <script>
 import myheader from '@/components/MyHeader.vue'
 import Item from '@/components/m_item.vue'
 import Content from '@/components/m_content.vue'
 import Sign from '@/components/sign.vue'
 import Footer from '@/components/footer.vue'
 import Points from '@/components/points.vue'
import Personal from '@/components/personal.vue'
import Personalleft from '@/components/personalleft.vue'
import M_content from '@/components/m_content.vue'
 export default {
     components:{
    myheader,
    Item,
    Content,
    Sign,
    Footer,
    Points,
    Personal,
    Personalleft,
    M_content
}
 }
 </script>
 
 <style scoped>
      .mybody{
        background-color: #F3F3F3;
        
      }
      .myperson{
        margin: 0 auto;
      }
      .my_header{
         padding: 0px !important;
         margin: 0px !important;
         /* width: 100vw; */
     }
    
     .container  {
       /* width: 100%; */
       background: #F3F3F3;
       padding: 0px !important;
       /* margin-top: 10px; */
       min-height: 660px;
       
     }
     
     .el-row{
       margin: 0px !important;
     }
     .myfooter{
       /* padding: 2px; */
       /* margin-top: 30px; */
       padding: 0px;
     }
     
 </style>