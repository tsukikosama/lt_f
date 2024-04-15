<template>
  <div>
    <div style="header" class="my_header">
      <myheader/>
    </div>

    <div class="container">
      <el-row  :gutter="24" >
        <el-col :sm="5" :md="5"   >
          <Item/>
        </el-col>
        <el-col :sm="14" :md="14">
          <m_daily />
        </el-col>
        <el-col :sm="5" :md="5">
          <Sign/>
          <Points/>
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
import m_daily from '@/components/m_daily.vue'
import Sign from '@/components/sign.vue'
import Footer from '@/components/footer.vue'
import Points from '@/components/points.vue'
export default {
  components:{
    myheader,
    Item,
    m_daily,
    Sign,
    Footer,
    Points
  }
}
</script>

<style scoped>
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
