<style>
  .ivu-table .demo-table-info-row td{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
  }
  .ivu-table td.demo-table-info-column{
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-age {
    background-color: #ff6600;
    color: #fff;
  }
  .ivu-table .demo-table-info-cell-address {
    background-color: #187;
    color: #fff;
  }
</style>
<template>
  <div style="background:#eee;padding: 20px">
  <Card :bordered="false" title="排名">
  <Table  :columns="columns9" :data="rankingList"></Table>
  </Card>
    <Page :total="10" show-total style="margin-top:10px;"/>
  </div>
</template>
<script>
import api from '@/config/api'
export default {
  data () {
    return {
      columns9: [
        {
          title: 'Rank',
          key: 'rank'
        },
        {
          title: 'Name',
          key: 'userName'
        },
        {
          title: 'Solved',
          key: 'solved',
          className: 'demo-table-info-column'
        },
        {
          title: 'Submit',
          key: 'submit'
        }
      ],
      rankingList: []
      // data1: [
      //   {
      //     rank: 1,
      //     name: 'jack',
      //     solved: '30',
      //     submit: '30'
      //   },
      //   {
      //     rank: 2,
      //     name: 'Jim Green',
      //     solved: '30',
      //     submit: '40'
      //   },
      //   {
      //     rank: 3,
      //     name: 'Joe Black',
      //     solved: '20',
      //     submit: '30'
      //   }
      // ]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    rowClassName (row, index) {
      if (index === 1) {
        return 'demo-table-info-row'
      } else if (index === 3) {
        return 'demo-table-error-row'
      }
      return ''
    },
    init () {
      this.$Loading.start()
      api['orderUsers']().then(res => {
        this.$Loading.finish()
        this.rankingList = res.data.data.list
      }, () => {
        this.$Loading.error()
      })
    }
  }
}
</script>
