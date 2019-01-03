<template>
  <div>
    <Table :loading="loading" :columns="columns1" :data="data1"></Table>
    <Page :total="100" show-total style="margin-top:10px;"/>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      loading: false,
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ]
    }
  }
}
axios.get('/apis/getProblemList.do', {
  params: {
    name: 'name',
    id: 1
  }
})
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
</script>
