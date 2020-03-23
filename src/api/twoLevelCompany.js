import request from '@/utils/request'

//获取地区
export function getArea(data) {
  return request({
    url: '/twoLevel/get-arae',
    method: 'post',
    data
  })
}

//添加二级单位
export function saveTowCompany(data) {
  return request({
    url: '/twoLevel/save-two-company',
    method: 'post',
    data
  })
}
//查看二级单位
export function getAllTwoCompany(data) {
  return request({
    url: '/twoLevel/get-all-two-company',
    method: 'post',
    data
  })
}

//删除二级单位
export function deleteTwoCompany(data) {
  return request({
    url: '/twoLevel/delete-two-company',
    method: 'post',
    data
  })
}

//编辑二级单位
export function editTwoCompany(data) {
  return request({
    url: '/twoLevel/edit-two-company',
    method: 'post',
    data
  })
}
export function updateTwoCompany(data) {
  return request({
    url: '/twoLevel/update-two-company',
    method: 'post',
    data
  })
}

//查看所有二级单位
export function getAllTwoCompanyOption(data) {
  return request({
    url: '/twoLevel/get-all-two-company-option',
    method: 'post',
    data
  })
}

