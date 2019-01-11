export default {
  getUnix () {
    var date = new Date()
    return date.getTime()
  },
  getTodayUnix () {
    var date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  getYearUnix () {
    var date = new Date()
    date.setMonth(0)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  getLastDate (time) {
    var date = new Date(time)
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
  },
  getFormatTime (time) {
    let timestamp = new Date(time).getTime()
    var now = this.getUnix()
    var today = this.getTodayUnix()
    var timer = (now - timestamp) / 1000
    var tip = ''

    if (timer <= 10) {
      tip = '刚刚'
    } else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚'
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前'
    } else if (timer >= 3600 && (timestamp - today >= 0)) {
      tip = Math.floor(timer / 3600) + '小时前'
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前'
    } else if (timer / 1036800 <= 12) {
      tip = Math.ceil(timer / 1036800) + '月前'
    } else {
      tip = this.getLastDate(timestamp)
    }
    return tip
  }
}
