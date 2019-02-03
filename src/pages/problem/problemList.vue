<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false" title="The Problems">
      <ol id="problem_list">
        <li v-for="(item , index) in problemsList" v-bind:key="index">
          <div class="ivu-row-flex ivu-row-flex-middle ivu-row-flex-space-between">
            <div class="contest-main ivu-col ivu-col-span-18" style="left: -20%">
              <p class="title">
                <a href="javascript:void(0)">{{item.title}}</a>
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
    <Page :total="10" show-total style="margin-top:10px;"/>
  </div>
</template>
<script>
import api from '@/config/api'
export default {
  data () {
    return {
      problemsList: []
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
      }, () => {
        this.$Loading.error()
      })
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
