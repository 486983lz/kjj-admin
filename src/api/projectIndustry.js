import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/recommend/projectIndustry/getAll',
    method: 'post',
    data
  })
}
export function getIndustryList(data) {
  return request({
    url: '/recommend/projectIndustry/getIndustryList',
    method: 'post',
    data
  })
}
export function createIndustry(data) {
  return request({
    url: '/recommend/projectIndustry/createIndustry',
    method: 'post',
    data
  })
}
export function createShow(data) {
  return request({
    url: '/recommend/projectIndustry/createShow',
    method: 'post',
    data
  })
}
export function createSearch(data) {
  return request({
    url: '/recommend/projectIndustry/createSearch',
    method: 'post',
    data
  })
}
