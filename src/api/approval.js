import request from '@/utils/request'

//查看二级单位
export function getApproval(data) {
  return request({
    url: '/approval/get-all-approval',
    method: 'post',
    data
  })
}

//查看所有领域
export function getAllIndustry(data) {
  return request({
    url: '/approval/all-industry',
    method: 'post',
    data
  })
}

//删除二级单位
/*export function deleteTwoCompany(data) {
  return request({
    url: '/twoLevel/delete-two-company',
    method: 'post',
    data
  })
}*/
