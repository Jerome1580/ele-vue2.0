import {formatDate_impl} from '@/common/js/date'

export const formatDate = (time) => {

  let date = new Date(time);

  // 实现
  return formatDate_impl(date, 'yyyy-MM-dd hh:mm')


}
