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
        </Menu>
      </Header>
      <!--<Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">-->
        <!--Content-->
      <!--</Content>-->
      <!--<Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>-->
    </Layout>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
