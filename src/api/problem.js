import request from '@/utils/request'

export function getProblemList(data) {
  return request({
    url: '/admin/problem/getProblemList',
    method: 'post',
    data
  })
}

export function getProblemInfo(data) {
  return request({
    url: '/admin/problem/getProblemInfo',
    method: 'post',
    data
  })
}
export function updateProblemStatus(data) {
  return request({
    url: '/admin/problem/updateProblemStatus',
    method: 'post',
    data
  })
}


