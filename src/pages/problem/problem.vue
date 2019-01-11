<template>
  <Row style="background:#eee;padding:10px" :gutter="16">
    <Row>
      <Col span="12" class="left" style="padding-left:10px;">
        <div class="title">
          {{problem.title}}
        </div>
        <div style="font-size:12px;">
          <span>时间限制&nbsp;&nbsp;:&nbsp;&nbsp;{{problem.timeLimit}}MS</span>
          <span style="margin-left:40px;">内存限制&nbsp;&nbsp;:&nbsp;&nbsp;{{problem.memoryLimit}}MB</span>
        </div>
      </Col>
      <Col span="12" class="right">
          <Row>
            <Col span="2" style="float:right;">
              <div>
                <p>提交次数</p>
                <p>{{problem.submit}}</p>
              </div>
            </Col>
              <Divider type="vertical" />
            <Col span="2" style="float:right;">
              <div>
                <p>通过次数</p>
                <p>{{problem.solved}}</p>
              </div>
            </Col>
          </Row>
      </Col>
    </Row>
   <Row>
     <div id="container">
       <Split v-model="split">
         <div slot="left" class="demo-split-pane">
           <Tabs @on-click="handleSubmission" v-model="displayTab" :animated="false">
             <TabPane label="题目描述" name="description" icon="ios-card-outline">
               <p class="title">
                 Description
               </p>
               <div class="info" v-html="problem.description">
                 <p>请计算两个整数的和并输出结果。</p>
                 <p>注意不要有不必要的输出，比如"请输入 a 和 b 的值: "，示例代码见隐藏部分。</p>
               </div>
               <p class="title">
                 Input
               </p>
               <div class="info" v-html="problem.input">
                 两个用空格分开的整数.
               </div>
               <p class="title">
                 Output
               </p>
               <div class="info" v-html="problem.output">
                 两数之和.
               </div>
               <p class="title">
                 Sample Input
               </p>
               <div class="info">
                 <pre>{{problem.sampleInput}}</pre>
               </div>
               <p class="title">
                 Sample Output
               </p>
               <div class="info">
                 <pre>{{problem.sampleOutput}}</pre>
               </div>
               <p class="title">
                 Hint
               </p>
               <div class="info" v-html="problem.hint">
                 <p>C 语言实现:</p>
                 <pre><code class="lang-c++">#include &lt;stdio.h&gt;
      int main(){
          int a, b;
          scanf("%d%d", &amp;a, &amp;b);
          printf("%d\n", a+b);
          return 0;
      }</code></pre>
                 <p>Java 实现:</p>
                 <pre><code class="lang-java">import java.util.Scanner;
      public class Main{
          public static void main(String[] args){
              Scanner in=new Scanner(System.in);
              int a=in.nextInt();
              int b=in.nextInt();
              System.out.println((a+b));
          }
      }</code></pre>
               </div>
             </TabPane>
             <TabPane label="提交记录" name="submission" icon="md-time" >
               <Table :loading="loading" :columns="columns1" :data="submissionList"></Table>
               <Page :total="100" show-elevator />
             </TabPane>
             <TabPane label="讨论" name="discuss" icon="ios-chatbubbles-outline">讨论</TabPane>
           </Tabs>
         </div>
         <div slot="right" class="demo-split-pane">
           <Row style="padding-bottom:2px;border-bottom: #DCDEE1 1px solid;">
             <Col span="8">
               <Select v-model="lang" style="width:200px" @on-change="changeLang">
                 <Option v-for="item in langs" :value="item.value" :key="item.value">{{ item.label }}</Option>
               </Select>
             </Col>
             <Col span="16">
               <div  style="float: right;">
                 <Tooltip content="获取最后一次提交的代码" placement="right">
                   <Icon type="md-cloud-download" size="20" @click="getLastCode"/>
                 </Tooltip>
                 <Tooltip content="还原到默认模板" placement="right">
                   <Icon type="ios-refresh" size="20"/>
                 </Tooltip>
                 <Tooltip content="代码编辑器设置" placement="right">
                   <Icon type="md-settings" size="20" @click="codeSetting"/>
                 </Tooltip>
               </div>
             </Col>
           </Row>
           <Row style="margin-top:10px;">
             <codemirror v-model="code" :options="cmOptions"></codemirror>
           </Row>
           <Row>
             <Button type="success" long style="margin-top: 1px;" @click="submitCode">提交</Button>
           </Row>
         </div>
       </Split>
     </div>
   </Row>
    <Modal
      v-model="submissionModal"
      title="提交记录">
      <Row>
        <codemirror v-model="submissionDetail.submissionModel.source" :options="cmOptions2" v-bind:style="{ fontSize: size + 'px' }"></codemirror>
      </Row>
    </Modal>
    <Modal
      v-model="codeSettingModal"
      title="代码编辑器设置">
      <Row :gutter="16" style="">
        <Col span="12">
          <p style="color: #212121;">字体设置</p>
          <p style="color: #9e9e9e">调整适合你的字体大小。</p>
        </Col>
        <Col span="12">
          <Select v-model="size">
            <Option v-for="item in sizeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row style="margin-top: 40px;"  :gutter="16">
        <Col span="12">
          <p style="color: #212121;">主题设置</p>
          <p style="color: #9e9e9e">切换不同的代码编辑器主题，选择适合你的语法高亮。</p>
        </Col>
        <Col span="12">
          <Select v-model="theme">
            <Option v-for="item in themeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row  style="margin-top: 40px;"  :gutter="16">
        <Col span="12">
          <p style="color: #212121;">键位绑定</p>
          <p style="color: #9e9e9e">想要练习使用 Vim 或者 Emacs？你可以在这里切换这些预设的键位绑定。</p>
        </Col>
        <Col span="12">
          <Select v-model="key">
            <Option v-for="item in keyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
      <Row  style="margin-top: 40px;"  :gutter="16">
        <Col span="12">
          <p style="color: #212121;">Tab 长度</p>
          <p style="color: #9e9e9e">选择你想要的 Tab 长度，默认设置为4个空格。</p>
        </Col>
        <Col span="12">
          <Select v-model="tab">
            <Option v-for="item in tabList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  </Row>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
// language js
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'
// theme css
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/material.css'

import api from '@/config/api'
import Time from '@/utils/Time'

export default {
  components: {
    codemirror
  },
  data () {
    return {
      problem: {},
      codeSettingModal: false,
      submissionModal: false,
      displayTab: 'description',
      submissionDetail: {
        submissionModel: {},
        compileinfoModel: {},
        runtimeinfoModel: {}
      },
      size: 13,
      tab: 4,
      key: 'default',
      theme: 'textmate',
      sizeList: [
        {
          value: 12,
          label: '12px'
        },
        {
          value: 13,
          label: '13px'
        },
        {
          value: 14,
          label: '14px'
        },
        {
          value: 15,
          label: '15px'
        },
        {
          value: 16,
          label: '16px'
        }
      ],
      themeList: [
        {
          value: 'textmate',
          label: 'textmate'
        },
        {
          value: 'github',
          label: 'github'
        },
        {
          value: 'xcode',
          label: 'xcode'
        },
        {
          value: 'eclipse',
          label: 'eclipse'
        },
        {
          value: 'monokai',
          label: 'monokai'
        },
        {
          value: 'blackboard',
          label: 'blackboard'
        },
        {
          value: 'solarized light',
          label: 'solarized light'
        },
        {
          value: 'solarized dark',
          label: 'solarized dark'
        },
        {
          value: 'tomorrow night',
          label: 'tomorrow night'
        }
      ],
      keyList: [
        {
          value: 'default',
          label: 'default'
        },
        {
          value: 'vim',
          label: 'Vim'
        },
        {
          value: 'emacs',
          label: 'Emacs'
        },
        {
          value: 'sublime',
          label: 'Sublime'
        }
      ],
      tabList: [
        {
          value: 2,
          label: '2个空格'
        },
        {
          value: 4,
          label: '4个空格'
        },
        {
          value: 8,
          label: '8个空格'
        }
      ],
      submissionCode: '',
      cmOptions2: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-java',
        theme: 'material',
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      columns1: [
        {
          title: '提交时间',
          key: 'addDatetime',
          render: (h, params) => {
            return h('span', {}, Time.getFormatTime(params.row.addDatetime))
          }
        },
        {
          title: '状态',
          key: 'result',
          render: (h, params) => {
            console.log(params)
            let result = params.row.result
            let color = ''
            let colorShow = ''
            switch (result) {
              case 0 :
                color = 'warning'
                colorShow = '等待中'
                break
              case 1 :
                color = 'warning'
                colorShow = '重判等待中'
                break
              case 2 :
                color = 'warning'
                colorShow = '编译中'
                break
              case 3 :
                color = 'warning'
                colorShow = '运行中'
                break
              case 4 :
                color = 'success'
                colorShow = '答案正确'
                break
              case 5 :
                color = 'warning'
                colorShow = '格式错误'
                break
              case 6 :
                color = 'error'
                colorShow = '答案错误'
                break
              case 7 :
                color = 'error'
                colorShow = '答案错误'
                break
              case 8 :
                color = 'error'
                colorShow = '答案错误'
                break
              case 9 :
                color = 'error'
                colorShow = '答案错误'
                break
              case 10 :
                color = 'error'
                colorShow = '答案错误'
                break
              case 11 :
                color = 'error'
                colorShow = '答案错误'
                break
              case 12 :
                color = 'warning'
                colorShow = '编译成功'
                break
            }
            return h('Button', {
              props: {
                type: color,
                size: 'small'
              },
              on: {
                click: () => {
                  console.log('click')
                  this.showSubmission(params.row.submissionId)
                }
              }
            }, colorShow)
          }
        },
        {
          title: '执行用时',
          key: 'time',
          render: (h, params) => {
            return h('span', {}, params.row.time + 'MS')
          }
        },
        {
          title: '耗费内存',
          key: 'memory',
          render: (h, params) => {
            return h('span', {}, params.row.memory + 'KB')
          }
        },
        {
          title: '语言',
          key: 'dispLanguage'
        }
      ],
      mode: 'text/x-java',
      submissionList: [],
      loading: false,
      langs: [
        {
          value: 0,
          label: 'C'
        },
        {
          value: 1,
          label: 'C++'
        },
        {
          value: 3,
          label: 'Java'
        },
        {
          value: 6,
          label: 'Python'
        },
        {
          value: 16,
          label: 'Javascript'
        }
      ],
      lang: 3,
      split: 0.5,
      code: 'public class Main {\n' +
        '\n' +
        '    public static void main(String[] args) {\n' +
        '        \n' +
        '        \n' +
        '    }\n' +
        '}',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-java',
        theme: 'material',
        keyMap: 'default',
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$Loading.start()
      this.problemID = this.$route.params.problemID
      api['problemDetail'](this.problemID).then(res => {
        this.$Loading.finish()
        this.problem = res.data.data
      }, () => {
        this.$Loading.error()
      })
    },
    getLastCode () {
      this.problemID = this.$route.params.problemID
      api.getLastCode(this.problemID).then(res => {
        let data = res.data.data
        if (data !== null) {
          this.code = data.source
        }
      }, () => {
        this.$Loading.error()
      })
    },
    handleSubmission (name) {
      console.log(name)
      if (name === 'submission') {
        this.problemID = this.$route.params.problemID
        api['submissionMy']({problemId: this.problemID}).then(res => {
          this.$Loading.finish()
          this.submissionList = res.data.data
        }, () => {
          this.$Loading.error()
        })
      }
    },
    codeSetting () {
      this.codeSettingModal = true
    },
    checkSubmissionStatus () {
      // 使用setTimeout避免一些问题
      if (this.refreshStatus) {
        // 如果之前的提交状态检查还没有停止,则停止,否则将会失去timeout的引用造成无限请求
        clearTimeout(this.refreshStatus)
      }
      const checkStatus = () => {
        this.problemID = this.$route.params.problemID
        api['submissionMy']({problemId: this.problemID}).then(res => {
          this.submissionList = res.data.data
          let sub = this.submissionList[0]
          if (sub.result >= 4 && sub.result <= 11) {
            this.submitting = false
            this.submitted = false
            clearTimeout(this.refreshStatus)
          } else {
            this.refreshStatus = setTimeout(checkStatus, 2000)
          }
        }, res => {
          this.submitting = false
          clearTimeout(this.refreshStatus)
        })
      }
      this.refreshStatus = setTimeout(checkStatus, 2000)
    },
    showSubmission (submissionId) {
      this.submissionModal = true
      this.submissionDetail = {}
      api.submissionDetail(submissionId).then(res => {
        this.submissionDetail = res.data.data
        let lang = this.submissionDetail.submissionModel.language
        let mode = this.getMode(lang)
        this.cmOptions2 = {
          // codemirror options
          tabSize: 4,
          mode: mode,
          theme: 'material',
          lineNumbers: true,
          line: true,
          readOnly: true
          // more codemirror options, 更多 codemirror 的高级配置...
        }
      }, () => {})
    },
    getMode (lang) {
      if (lang === 0) {
        return 'text/x-csrc'
      } else if (lang === 1) {
        return 'text/x-c++src'
      } else if (lang === 3) {
        return 'text/x-java'
      } else if (lang === 6) {
        return 'text/x-python'
      } else if (lang === 16) {
        return 'text/javascript'
      }
      return ''
    },
    changeLang (lang) {
      console.log('change :  ' + lang)
      this.mode = this.getMode(lang)
      this.cmOptions = {
        // codemirror options
        tabSize: 4,
        mode: this.mode,
        keyMap: this.key,
        theme: this.theme,
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    },
    submitCode () {
      this.problemID = this.$route.params.problemID
      api['submitCode']({problemId: this.problemID, source: this.code, userId: 1, userName: '刘孝敬', language: this.lang}).then(res => {
        this.$Loading.finish()
        this.displayTab = 'submission'
        this.handleSubmission(this.displayTab)
        this.checkSubmissionStatus()
      }, () => {
        this.$Loading.error()
      })
    },
    beforeRouteLeave (to, from, next) {
      // 防止切换组件后仍然不断请求
      clearInterval(this.refreshStatus)
      next()
    }
  }
}
</script>
<style>
  .right{
    float: right;
    width:50%;
    margin-bottom:-10px;
  }
  .left{
    width:50%;
    margin-bottom:4px;
  }
  .left .title{
    font-size:20px;
    font-weight: 600;
  }
  #container {
    height: 800px;
    overflow: auto;
    border: 1px solid #dcdee2;
    background-color: #fff;
  }

  .demo-split-pane {
    padding: 10px;
    height:100%;
    overflow: auto;
  }

  p.title {
    font-size: 20px;
    font-weight: 400;
    margin: 25px 0 8px;
    color: #3091f2;
  }

  div.info {
    margin-left: 25px;
    margin-right: 20px;
    font-size: 15px;
  }

  pre {
    white-space: pre-wrap;
  }

  pre {
    background: #f7f9fa;
    padding: 10px 15px;
    color: #263238;
    line-height: 1.6;
    font-size: 13px;
    border-radius: 3px;
  }

  pre {
    margin-top: 0;
    margin-bottom: 1em;
    overflow: auto;
  }
</style>
