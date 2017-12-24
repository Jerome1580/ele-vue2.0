export function formatDate_impl(date, fmt) {

  if (/(y+)/.test(fmt)) {
    // 根据y的长度来截取相应的年
    // 如：yyyy -> 2016
    // 如：yy -> 16 -> substr(4-RegExp.$1.length)
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLetZero(str))
    }
  }

  return fmt;

};

// 不足的补0，技巧
function padLetZero(str) {
  return ('00' + str).substr(str.length)
}
