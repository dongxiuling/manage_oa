import request from '@/utils/request'

// 管理员查询全部会议
export function getAllList(data) {
    return request({
      url: '/meeting/selectMeeting',
      method: 'post',
      data:data
    })
  }

//查看会议详情
export function getMeetingDetail(data) {
  return request({
      url: '/meeting/getReadById',
      method: 'post',
      data: data
  })
}