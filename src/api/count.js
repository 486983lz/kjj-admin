import request from '@/utils/request'

export function getIndustryCount(data) {
  return request({
    url: '/admin/count/getIndustryCount',
    method: 'post',
    data
  })
}

export function getIndustryCapitalCount(data) {
  return request({
    url: '/admin/count/getIndustryCapitalCount',
    method: 'post',
    data
  })
}

//获取年度立项项目统计
export function getYearCount(data) {
  return request({
    url: '/admin/count/getYearCount',
    method: 'post',
    data
  })
}



