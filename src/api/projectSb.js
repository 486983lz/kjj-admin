import request from '@/utils/request'

export function getRecommendProjectList(data) {
  return request({
    url: '/admin/projectSb/getRecommendProjectList',
    method: 'post',
    data
  })
}

