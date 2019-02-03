<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false" title="All Contests">
        <ol id="contest_list">
          <li v-for="(item , index) in contestsList" v-bind:key="index">
            <div class="ivu-row-flex ivu-row-flex-middle ivu-row-flex-space-between">
              <img src="/static/image/award.png" class="trophy">
              <div class="contest-main ivu-col ivu-col-span-18" style="left: -20%">
                  <p class="title">
                    <a :href="'/contests/'+item.contestId">{{item.title}}</a>
                  </p>
                  <ul>
                    <li title="截止时间"><Icon type="ios-calendar-outline" style="color: rgb(48, 145, 242);"/>
                        {{item.endTime}}</li>
                    <li><Icon type="ios-clock-outline" style="color: rgb(48, 145, 242);"/>
                    <span title="剩余天数">7 days</span></li>
                    <li>
                      <button  type="button" shape="circle" class="ivu-btn ivu-btn-circle ivu-btn-small">
                        <span title="比赛模式">OI</span>
                      </button>
                    </li>
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
import axios from 'axios'

export default {
  data () {
    return {
      contestsList: '',
      loading: false
    }
  },
  created: function () { // 初始化
    let self = this
    axios.get('/getAllContests.do', {})
      .then(function (response) {
        self.contestsList = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
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
