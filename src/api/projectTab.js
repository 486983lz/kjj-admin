import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/admin/projectTab/getAll',
    method: 'post',
    data
  })
}
export function getTabList(data) {
  return request({
    url: '/admin/projectTab/getTabList',
    method: 'post',
    data
  })
}
export function createTab(data) {
  return request({
    url: '/admin/projectTab/createTab',
    method: 'post',
    data
  })
}
export function createShow(data) {
  return request({
    url: '/admin/projectTab/createShow',
    method: 'post',
    data
  })
}
export function createSearch(data) {
  return request({
    url: '/admin/projectTab/createSearch',
    method: 'post',
    data
  })
}
