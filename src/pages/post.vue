<template>
    <div>
           <div style="header" class="my_header">
              <myheader/>
          </div>
          
          <div class="container">
  
              <el-row  :gutter="24" >
                  <el-col :sm="24" :md="24"   >
                      <Postcontent/>
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
  
  import Footer from '@/components/footer.vue'
  import Add from '@/components/m_add.vue'
import Postcontent from '@/components/postcontent.vue'
  export default {
       components:{
          myheader,
          Add,
          Footer,
              Postcontent
          
      }
  }
  </script>
  
  <style  scoped>
       .my_header{
          padding: 0px !important;
          margin: 0px !important;
          /* width: 100vw; */
          width: 100%;
      }
     
      .container  {
        /* width: 100%; */
        background-color: white;
        padding: 0px !important;
      
        margin-top: 10px;
        min-height: 660px;
      }
      .el-footer{
        padding: 0px;
        /* margin-top: 50px; */
      }
      .el-row{
        margin: 0px !important;
      }
      .myfooter{
        padding: 0px;
      }
  </style>