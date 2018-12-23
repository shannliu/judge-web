<template>
  <div id="app">
    <Navbar />
    <div class="content-app">
      <transition name="fadeInUp" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <Footer class="layout-footer-center">2002-2019 &copy; Nju Software</Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}

</script>

<style>
  .content-app{
    margin: 88px 20px 0;
    background: #fff;
    minHeight: 500px;
  }
  .layout-footer-center{
    text-align: center;
    margin-top:10px;
    position: fixed;
    bottom:0px;
    width:100%;
  }
</style>
