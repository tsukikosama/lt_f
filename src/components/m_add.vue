<template>
  <div class="mycontent">
        <h1>发帖子</h1>
        <!-- 分离 -->
        <div style="margin-top: 20px">
          <el-checkbox-group v-model="checkTag" size="mini" >
            <el-checkbox-button v-for="tag,index in tags" :label="tag" :key="index">{{tag.tag}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <!-- 标题 -->
        <div>
          <h1>标题</h1>
          <el-input v-model="title"></el-input>
        </div>
          <h1>内容</h1>
              <div>
                <div style="border: 1px solid #ccc;">
                  <Toolbar
                      style="border-bottom: 1px solid #ccc"
                      :editor="editor"
                      :defaultConfig="toolbarConfig"
                      :mode="mode"
                  />
                  <Editor
                      style="height: 500px; overflow-y: hidden;"
                      v-model="html"
                      :defaultConfig="editorConfig"
                      :mode="mode"
                      @onCreated="onCreated"
                  />
                </div>
              </div>
        <!-- 标签 -->


        <div class="last"><el-button type="success" @click="add()">发表帖子</el-button></div>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import request from '@/utils/request';
export default {
  components: { Editor, Toolbar },
  data () {
      return {
        checkTag:[],
        tags:'',
        title:'',
        editor: null,
            html: '',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
       };
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        init(){
          request.get('/tag/list').then((res) =>{
            this.tags = res.data
          }).catch((e) =>{
            this.$message.error("查询失败")
          })
        },
        add(){
          let arr= {};
          arr.content = this.editor.html

          let s = this.checkTag.map(item =>{return[item.tag].toString()});
          // console.log(s)
          arr.saveTag = s ;
          arr.title = this.title
          arr.visit = 0
          arr.likes = 0
          arr.replycount = 0;
          arr.uid = this.$store.state.user.uid
          arr.username = this.$store.state.user.username
          arr.avatar = this.$store.state.user.avatar
          console.log(arr)
          request.post('/post/add',arr).then((res) =>{
            this.$message.success("添加成功")
            this.checkTag = []

            this.title = ''
            this.html = ''
          }).catch((e) =>{
            this.$message.error("添加失败")
          })
        }
    },
    mounted() {
        this.init();
        // 模拟 ajax 请求，异步渲染编辑器
        setTimeout(() => {
            this.html = ''
        }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
  .mycontent{
    width: 60vw;
    margin: 0 auto;
    /* padding: 10px; */
    /* background: #154125; */

  }
  .mycontent div{
      padding: 5px 0px;
  }

  .last{
    text-align: center;
  }

</style>
