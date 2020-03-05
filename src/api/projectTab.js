import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/recommend/projectTab/getAll',
    method: 'post',
    data
  })
}
