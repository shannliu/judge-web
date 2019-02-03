<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false" title="The Problems">
      <ol id="problem_list">
        <li v-for="(item , index) in page.data" v-bind:key="index">
          <div class="ivu-row-flex ivu-row-flex-middle ivu-row-flex-space-between">
            <div class="contest-main ivu-col ivu-col-span-18" >
              <p class="title">
                <a v-bind:href="'/problem/' + item.problemId">{{item.title}}</a>
              </p>
              <ul>
                <li title="是否通过"><Icon type="ios-calendar-outline" style="color: rgb(48, 145, 242);"/>
                  {{item.solved}}</li>
              </ul>
            </div>
          </div>
        </li>
      </ol>
    </Card>
    <Page :total="page.total" page-size=20 style="padding-left: 20px;margin-top:10px;" size="small" @on-change="onChange" show-total show-elevator show-sizer />
  </div>
</template>
<script>
import api from '@/config/api'
export default {
  data () {
    return {
      problemsList: [],
      page: {
        data: [],
        total: 0
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$Loading.start()
      api['problemsList']().then(res => {
        this.$Loading.finish()
        this.problemsList = res.data.data
        for (let i = 0; i < this.problemsList.length; i++) {
          if (i < 20) {
            this.page.data.push(this.problemsList[i])
          }
        }
        this.page.total = this.problemsList.length
      }, () => {
        this.$Loading.error()
      })
    },
    onChange: function (curpage) {
      this.page.data = []
      for (var i = 10 * (curpage - 1) + 1; i <= ((this.page.total > 10 * curpage) ? (10 * curpage) : (this.page.total)); i++) {
        this.page.data.push(this.problemsList[i - 1])
      }
    }
  }
}
</script>
<style>
  ol li{
    padding: 20px;
    border-bottom: 1px solid hsla(0,0%,73%,.5);
    list-style: none;
  }
  .trophy{
    height: 40px;
    margin-left: 10px;
    margin-right: -20px;
  }
  li .contest-main .title{
    font-size: 18px;
  }
  a{
    color: #495060;
    background: 0 0;
    text-decoration: none;
    outline: 0;
    cursor: pointer;
    transition: color .2s ease;
  }
  .contest-main li{
    padding: 10px 0 0;
    display: inline-block;
    border-bottom: 0px;
  }
</style>
