import request from '@/utils/request'


export function createExpert(data) {
  return request({
    url: '/recommend/expert/createExpert',
    method: 'post',
    data
  })
}
export function updateExpert(data) {
  return request({
    url: '/recommend/expert/updateExpert',
    method: 'post',
    data
  })
}
export function getExpertList(data) {
  return request({
    url: '/recommend/expert/getExpertList',
    method: 'post',
    data
  })
}
