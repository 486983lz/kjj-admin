import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/recommend/projectTab/getAll',
    method: 'post',
    data
  })
}
export function getTabList(data) {
  return request({
    url: '/recommend/projectTab/getTabList',
    method: 'post',
    data
  })
}
export function createTab(data) {
  return request({
    url: '/recommend/projectTab/createTab',
    method: 'post',
    data
  })
}
export function createShow(data) {
  return request({
    url: '/recommend/projectTab/createShow',
    method: 'post',
    data
  })
}
export function createSearch(data) {
  return request({
    url: '/recommend/projectTab/createSearch',
    method: 'post',
    data
  })
}
