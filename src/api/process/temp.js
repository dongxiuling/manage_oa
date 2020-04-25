import request from '@/utils/request'

export function getUser(query) {
  return request({
    url: '/system/user/getUserByDept',
    method: 'get',
    params: query
  })
}

export function addTemp(data) {
  return request({
    url: '/workflowtemplate/createTemplate',
    method: 'post',
    data: data
  })
}

export function getTemp(data) {
  return request({
    url: '/workflowtemplate/query',
    method: 'post',
    data
  })
}

export function updateTemp(data) {
  return request({
    url: '/workflowtemplate/updTemplate',
    method: 'post',
    data: data
  })
}

export function deleteTemp(params) {
  return request({
    url: '/workflowtemplate/deleteById/'+params.id,
    method: 'get'
  })
}

export function getItem(params) {
  return request({
    url: '/workflowtemplate/getById/'+params.id,
    method: 'get'
  })
}
