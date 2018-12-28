<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    height: 30px;
    /*background: #5b6270;*/
    border-radius: 3px;
    color:#fff;
    font-size: 20px;
    line-height: 30px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 600px;
    margin: 0 auto;
  }
  .layout-sign{
    position: relative;
    color: white;
    font-size: 17px;
    float: right;
    margin-right: 50px;
  }
  span:hover{
    cursor: pointer;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <span>NanJing University Online Judge</span>
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              首页
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              练习
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              竞赛
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              试炼场
            </MenuItem>
            <MenuItem name="5">
              <Icon type="ios-paper"></Icon>
              状态
            </MenuItem>
            <MenuItem name="6">
              <Icon type="ios-paper"></Icon>
              讨论区
            </MenuItem>
          </div>
          <div class="layout-sign">
            <div v-if="!loginSuccess">
              <span class="" v-on:click="loginIn">Sign&nbsp;in</span>
              <label style="color: #cbced4">or</label>
              <span>Sign&nbsp;up</span>
            </div>
            <div v-else>
              <span style="font-size: smaller;color: oldlace">登录成功</span>
              <span @click="login_out">&nbsp;Sing up</span>
            </div>
          </div>
        </Menu>
      </Header>
      <!--<Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">-->
        <!--Content-->
      <!--</Content>-->
      <!--<Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>-->
    </Layout>
    <!--登录modal-->
    <Modal
      v-model="modal1"
      title="Welcome to Login in">
      <LoginIn @login_status="get_status"/>
    </Modal>
  </div>

</template>
<script>
import LoginIn from '@/components/login/LoginIn'
import axios from 'axios'

export default {
  name: 'Navbar',
  components: { LoginIn
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      modal1: false,
      loginSuccess: window.localStorage.getItem('login_status')
    }
  },
  methods: {
    loginIn: function () {
      this.modal1 = true
    },
    get_status: function (res) {
      this.loginSuccess = res
      this.modal1 = false
      debugger
      if (res === true) {
        alert('登录成功')
        window.localStorage.setItem('login_status', 'login_in')
      }
    },
    login_out: function (username) {
      username = 'test' // todo
      let that = this
      axios.get('/apis/loginOut.do', username).then(function (res) {
        if (res.data === true) {
          that.loginSuccess = false
          window.localStorage.clear()
        }
      })
    }
  }
}
</script>
