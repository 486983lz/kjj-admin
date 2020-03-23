import request from '@/utils/request'

//分配地区
export function distributionArea(data) {
  return request({
    url: '/distribution/distribution-area',
    method: 'post',
    data
  })
}

