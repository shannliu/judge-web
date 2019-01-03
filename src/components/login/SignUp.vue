<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
    <FormItem label="Username" prop="username">
      <Input type="text" v-model="formCustom.username"></Input>
    </FormItem>
    <FormItem label="Password" prop="passwd">
      <Input type="password" v-model="formCustom.passwd"></Input>
    </FormItem>
    <FormItem label="Confirm" prop="passwdCheck">
      <Input type="password" v-model="formCustom.passwdCheck"></Input>
    </FormItem>
    <FormItem label="Email" prop="email">
      <Input type="text" v-model="formCustom.email"></Input>
    </FormItem>
    <FormItem style="margin-left:-80px">
      <Button class="submitButton" @click="handleSubmit('formCustom')">Sign Up</Button>
    </FormItem>
  </Form>
</template>
<style>
  input{
    width: 95%;
  }
  .submitButton{
    width: 60%;
    background-color: #57a3f3;
    border-color: #2d8cf0;
    color: #ffffff;
  }
</style>
<script>
import axios from 'axios'

function UserModal () {
  this.user = ''
  this.password = ''
  this.email = ''
}
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'))
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('The two input passwords do not match!'))
      } else {
        callback()
      }
    }
    return {
      formCustom: {
        username: '',
        passwd: '',
        passwdCheck: '',
        email: ''
      },
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let model = new UserModal()
          model.user = this.formCustom.username
          model.password = this.formCustom.passwd
          model.email = this.formCustom.email
          axios.post('/apis/register.do', model).then(function (res) {
            alert(res)
          })
        } else {
          this.$Message.error('please check the form!')
        }
      })
    }
  }
}
</script>
