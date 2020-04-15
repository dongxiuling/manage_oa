import request from '@/utils/request'

// 管理员查询全部考题列表
// export function getExcisesList(data) {
//     return request({
//         url: '/exam/getQuestionByCate',
//         method: 'post',
//         params: data
//     })
// }
export function getExcisesList(params) {
    return request({
      url: '/exam/getQuestionByCate',
      method: 'post',
      params
    })
  }

// 添加和修改考试题
export function addExam(params) {
    return request({
        url: '/exam/createExer',
        method: 'post',
        params
    })
}
// 删除考试题
export function delExam(query) {
  return request({
      url: '/exam/delExerById/'+query.id,
      method: 'get',
  })
}