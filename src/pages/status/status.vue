<template>
  <Table stripe :columns="columns1" :data="data"></Table>
</template>

<script>
import api from '@/config/api'
import Time from '@/utils/Time'

export default {
  name: 'status',
  data () {
    return {
      columns1: [
        {
          title: '时间',
          key: 'addDatetime',
          render: (h, params) => {
            return h('span', {}, Time.getFormatTime(params.row.addDatetime))
          }
        },
        {
          title: 'ID',
          key: 'submissionId'
        },
        {
          title: '状态',
          key: 'result',
          render: (h, params) => {
            console.log(params)
            let result = params.row.result
            let color = ''
            let colorShow = ''
            switch (result) {
              case 0 :
                color = 'warning'
                colorShow = '等待中'
                break
              case 1 :
                color = 'warning'
                colorShow = '重判等待中'
                break
              case 2 :
                color = 'warning'
                colorShow = '编译中'
                break
              case 3 :
                color = 'warning'
                colorShow = '运行中'
                break
              case 4 :
                color = 'success'
                colorShow = '答案正确'
                break
              case 5 :
                color = 'warning'
                colorShow = '格式错误'
                break
              case 6 :
                color = 'error'
                colorShow = '答案错误'
                break
              case 7 :
                color = 'error'
                colorShow = '时间超限'
                break
              case 8 :
                color = 'error'
                colorShow = '内存超限'
                break
              case 9 :
                color = 'error'
                colorShow = '输出超限'
                break
              case 10 :
                color = 'error'
                colorShow = '运行错误'
                break
              case 11 :
                color = 'error'
                colorShow = '编译错误'
                break
              case 12 :
                color = 'success'
                colorShow = '编译成功'
                break
            }
            return h('Button', {
              props: {
                type: color,
                size: 'small'
              },
              on: {
                click: () => {
                  console.log('click')
                  this.showSubmission(params.row.submissionId)
                }
              }
            }, colorShow)
          }
        },
        {
          title: '问题',
          key: 'problemId',
          render: (h, params) => {
            return h('span',
              {
                style: {
                  color: '#57a3f3',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    if (this.contestID) {
                      this.$router.push(
                        {
                          name: 'contest-problem-details',
                          params: {problemID: params.row.problem, contestID: this.contestID}
                        })
                    } else {
                      this.$router.push({name: 'problemDetail', params: {problemID: params.row.problemId}})
                    }
                  }
                }
              },
              params.row.problemId)
          }
        },
        {
          title: '耗时',
          key: 'time',
          render: (h, params) => {
            return h('span', {}, params.row.time + 'MS')
          }
        },
        {
          title: '内存',
          key: 'memory',
          render: (h, params) => {
            let m = parseInt(params.row.memory / 1000)
            return h('span', {}, m + 'MB')
          }
        },
        {
          title: '语言',
          key: 'dispLanguage'
        },
        {
          title: '提交人',
          key: 'userName'
        }
      ],
      data: [],
      loading: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$Loading.start()
      api['statusList']().then(res => {
        this.$Loading.finish()
        this.data = res.data.data
      }, () => {
        this.$Loading.error()
      })
    }
  }
}
</script>

<style scoped>

</style>
