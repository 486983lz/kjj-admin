import request from '@/utils/request'


export function getFlowList(data) {
  return request({
    url: '/admin/flow/getFlowList',
    method: 'post',
    data
  })
}

export function updateFlow(data) {
  return request({
    url: '/admin/flow/updateFlow',
    method: 'post',
    data
  })
}

export function createFlow(data) {
  return request({
    url: '/admin/flow/createFlow',
    method: 'post',
    data
  })
}
export function getFlowInfo(data) {
  return request({
    url: '/admin/flow/getFlowInfo',
    method: 'post',
    data
  })
}

export function saveFlowInfo(data) {
  return request({
    url: '/admin/flow/saveFlowInfo',
    method: 'post',
    data
  })
}
