import Vue from 'vue'

// 播放次数
Vue.filter('playNum', count => {
  if (count > 100000) {
    return parseInt(count / 10000)
  } else {
    return count
  }
})

// 格式化时间
Vue.filter('formatTime', d => {
  let m = parseInt(d / 1000 / 60)
    .toString()
    .padStart(2, '0')
  let s = parseInt((d / 1000) % 60)
    .toString()
    .padStart(2, '0')
  return m + ':' + s
})

// 格式化日期
Vue.filter('formatDate', originVal => {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
