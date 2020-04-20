import request from '@/utils/request'

// 查询部门列表
export function getType(query) {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params: query
  })
}

export function addLink(data) {
  return request({
    url: '/workflowNode/create',
    method: 'post',
    data: data
  })
}

export function delLink(query) {
  return request({
    url: '/workflowNode/deleteById/'+query.id,
    method: 'get'
  })
}

export function updateLink(data) {
  return request({
    url: '/workflowNode/update',
    method: 'put',
    data: data
  })
}

export function queryLink(data) {
  return request({
    url: '/workflowNode/query',
    method: 'post',
    data: data
  })
}

export function setDown(query) {
  return request({
    url: '/workflowNode/next/'+query.id,
    method: 'put'
  })
}

export function setUp(query) {
  return request({
    url: '/workflowNode/pre/'+query.id,
    method: 'put'
  })
}

