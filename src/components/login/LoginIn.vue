<template>
  <Form ref="formInline" :model="formInline" :rules="ruleInline">
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button class="submitButton" @click="handleSubmit('formInline')">Sign in</Button>
    </FormItem>
  </Form>
</template>
<script>
// import axios from 'axios'
import $ from 'jquery'

export default {
  name: 'LoginIn',
  data () {
    return {
      status: false,
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let model = this.formInline
          // 需要同步
          $.ajax({
            url: '/apis/login.do',
            method: 'POST',
            xhrFields: {
              withCredentials: true // 这里设置了withCredentials
            },
            contentType: 'application/json',
            data: JSON.stringify(model),
            async: false,
            success: response => {
              // 登录成功
              this.status = response === 'success'
            },
            error: function () {
              alert('登录失败！')
            }
          })
        } else {
          this.$Message.error('密码长度不得小于6位!')
        }
      })
      // 返回登录结果父组件
      this.$emit('login_status', this.status)
    }
  }
}
</script>
<style>
  .submitButton{
    width: 90%;
    /*margin-left: 5%;*/
    background-color: #57a3f3;
    border-color: #2d8cf0;
    color: #ffffff;
  }
</style>
