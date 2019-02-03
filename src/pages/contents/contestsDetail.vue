<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false">
      <h1>{{contestInfo.title}}</h1>
      <div class="callout">
        <div style="padding: 5px 0 5px 0">
          <label style="background-color: red;width: 5px;"> &nbsp;</label>
          <label>本场竞赛已经开始，还剩余 1 小时 16 分 18 秒 结束</label></div>
      </div>
      <br>
      <div style="margin-bottom: 15px">
        <h2 style="margin-bottom: 10px">竞赛描述</h2>
        <p style="margin-left: 5px">{{contestInfo.description}}</p>
      </div>
      <Card>
        <p slot="title">竞赛信息</p>
        <div style="text-align:center">
          <Table :columns="columns1" :data="data1"></Table>
        </div>
      </Card>
      <Row>
        <Col span="15" style="margin-right: 30px">
          <Card style="margin-top: 15px">
            <p slot="title">问题列表</p>
            <div style="text-align:center">
              <Table stripe :columns="columns2" :data="data2"></Table>
            </div>
          </Card>
        </Col>
        <Col span="8">
          <Card style="margin-top: 15px">
            <p slot="title">排名</p>
            <div style="text-align:center">
              <Table stripe :columns="columns3" :data="data3"></Table>
            </div>
          </Card>
        </Col>
      </Row>

    </Card>
  </div>
</template>
<script>
import api from '@/config/api'

export default {
  data () {
    return {
      contestInfo: '',
      contestID: 1000,
      columns1: [
        {
          title: '开始时间',
          key: 'start_time'
        },
        {
          title: '结束时间',
          key: 'end_time'
        },
        {
          title: '竞赛模式',
          key: 'contest_type'
        },
        {
          title: '竞赛规则',
          key: 'rule'
        },
        {
          title: '发起人',
          key: 'author'
        }
      ],
      data1: [
        {
          start_time: '',
          end_time: '',
          contest_type: '',
          rule: '',
          author: ''
        }
      ],
      columns2: [
        {
          title: '#',
          key: 'problemId'
        },
        {
          title: 'Title',
          key: 'title'
        },
        {
          title: 'total',
          key: 'submit'
        },
        {
          title: 'AC Rate',
          key: 'accepted'
        }
      ],
      data2: [
      ],
      columns3: [
        {
          title: '排名',
          key: 'rank'
        },
        {
          title: '用户名',
          key: 'userName'
        },
        {
          title: '得分',
          key: 'score'
        },
        {
          title: '时间',
          key: 'time'
        }
      ],
      data3: [
        {
          rank: '1',
          userName: 'Tom',
          score: '20',
          time: '125分钟'
        },
        {
          rank: '2',
          userName: 'Andy',
          score: '18',
          time: '150分钟'
        }
      ]
    }
  },
  created: function () { // 初始化
    let self = this
    this.contestID = this.$route.params.contestID
    api['getContest'](this.contestID).then(response => {
      if (response.data.code !== 0) {
        this.$error('error')
        console.log('error') // todo  后续改为模态框提示
      } else {
        self.contestInfo = response.data.data
        self.data1[0].start_time = self.contestInfo.beginTime
        self.data1[0].end_time = self.contestInfo.endTime
        self.data1[0].contest_type = self.contestInfo.accessPermission
        self.data1[0].rule = self.contestInfo.contestType
        self.data1[0].author = self.contestInfo.userName
      }
    }, () => {
      this.$Loading.error()
    })
    api['getCProblems'](this.contestID).then(response => {
      if (response.data.code !== 0) {
        this.$error('error')
        console.log('error') // todo  后续改为模态框提示
      } else {
        self.data2 = response.data.data
      }
    }, () => {
      this.$Loading.error()
    })
  }
}
</script>
<style>
  .callout {
    margin: 5px 0 0 5px;
    height: 40px;
    background: white;
    font-size: 18px;
    font-weight: 300;
  }
</style>
