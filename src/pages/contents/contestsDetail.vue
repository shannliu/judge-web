<template>
  <div style="background:#eee;padding: 20px">
    <Card :bordered="false">
      <h1>竞赛标题</h1>
      <div class="callout">
        <div style="padding: 5px 0 5px 0">
          <label style="background-color: red;width: 5px;"> &nbsp;</label>
          <label>本场竞赛已经开始，还剩余 1 小时 16 分 18 秒 结束</label></div>
      </div>
      <br>
      <div style="margin-bottom: 15px">
        <h2 style="margin-bottom: 10px">竞赛描述</h2>
        <p style="margin-left: 5px" >本竞赛用于xxxxxxxxxxxx</p>
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
export default {
  data () {
    return {
      columns1: [
        {
          title: 'StartTime',
          key: 'start_time'
        },
        {
          title: 'EndTime',
          key: 'end_time'
        },
        {
          title: 'ContestType',
          key: 'contest_type'
        },
        {
          title: 'Rule',
          key: 'rule'
        },
        {
          title: 'Author',
          key: 'author'
        }
      ],
      data1: [
        {
          start_time: '2019-01-20',
          end_time: '2019-01-20',
          contest_type: 'public',
          rule: 'ACM',
          author: 'zk'
        }
      ],
      columns2: [
        {
          title: '#',
          key: 'p_id'
        },
        {
          title: 'Title',
          key: 'p_title'
        },
        {
          title: 'total',
          key: 'p_total'
        },
        {
          title: 'AC Rate',
          key: 'p_rate'
        }
      ],
      data2: [
        {
          p_id: 1,
          p_title: '2019-01-20',
          p_total: 'public',
          p_rate: 'ACM'
        },
        {
          p_id: 1,
          p_title: '2019-01-20',
          p_total: 'public',
          p_rate: 'ACM'
        },
        {
          p_id: 1,
          p_title: '2019-01-20',
          p_total: 'public',
          p_rate: 'ACM'
        }
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
  }
}
</script>
<style>
  .callout {
    margin: 5px 0 0 5px;
    height:40px;
    background: white;
    font-size: 18px;
    font-weight: 300;
  }
  .callout-success {
    border-left-color: #5cb85c;
  }
</style>
