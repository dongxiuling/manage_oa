import request from '@/utils/request'

// 管理员查询全部资料
export function getFileList(data) {
    return request({
      url: '/resources/selectResources',
      method: 'post',
      data:data
    })
  }
  // 管理员删除资料
export function delFile(data) {
  return request({
    url: '/resources/delResourcesById/'+data.id,
    method: 'get'
  })
}