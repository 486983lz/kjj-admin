import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/admin/projectIndustry/getAll',
    method: 'post',
    data
  })
}
export function getIndustryList(data) {
  return request({
    url: '/admin/projectIndustry/getIndustryList',
    method: 'post',
    data
  })
}
export function createIndustry(data) {
  return request({
    url: '/admin/projectIndustry/createIndustry',
    method: 'post',
    data
  })
}
export function createShow(data) {
  return request({
    url: '/admin/projectIndustry/createShow',
    method: 'post',
    data
  })
}
export function createSearch(data) {
  return request({
    url: '/admin/projectIndustry/createSearch',
    method: 'post',
    data
  })
}
