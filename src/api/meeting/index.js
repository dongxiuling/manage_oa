import request from '@/utils/request'

// 管理员查询全部会议
export function getAllList(data) {
  return request({
    url: '/meeting/selectMeeting',
    method: 'post',
    data: data
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

// 添加会场
export const addMeetingRoom = (data = {}) => request({
  url: '/room/save',
  method: 'post',
  data
})

// 获取会场列表
export const getRoomList = (data = {}) => request({
  url: '/room/selectRoom',
  method: 'post',
  data
})

// 删除会场
export const delRoom = id => {
  return request({
    url: `/room/delRoomById/${id}`,
    method: 'get'
  })
}

export const getRoomDetail = id => {
  return request({
    url: `/room/getRoomById/${id}`,
    method: 'get'
  })
}

export const updateRoom = (data = {}) => request({
  url: '/room/update',
  method: 'post',
  data
})
