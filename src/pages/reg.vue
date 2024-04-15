<template>
  <div>
         <div style="header" class="my_header">
            <myheader/>
        </div>
        
        <div class="container">

            <el-row  :gutter="24" >
                <el-col :sm="24" :md="24"   >
                    <M_reg/>
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
import M_login from '@/components/m_login.vue'
import M_reg from '@/components/m_reg.vue'
export default {
     components:{
        myheader,
        Add,
        Footer,
        M_login,
          M_reg
        
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
     .el-footer{
      padding: 0px;
      
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