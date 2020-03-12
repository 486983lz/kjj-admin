import request from '@/utils/request'


export function createExpert(data) {
  return request({
    url: '/admin/expert/createExpert',
    method: 'post',
    data
  })
}
export function updateExpert(data) {
  return request({
    url: '/admin/expert/updateExpert',
    method: 'post',
    data
  })
}
export function getExpertList(data) {
  return request({
    url: '/admin/expert/getExpertList',
    method: 'post',
    data
  })
}

export function deleteExpert(data) {
  return request({
    url: '/admin/expert/deleteExpert',
    method: 'post',
    data
  })
}
