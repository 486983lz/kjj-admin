import request from '@/utils/request'

//添加管理员账号
export function saveAccounts(data) {
  return request({
    url: '/admin/save-accounts',
    method: 'post',
    data
  })
}

//查看管理员账号
export function allRecommendAccounts(data) {
  return request({
    url: '/admin/all-recommend-accounts',
    method: 'post',
    data
  })
}

//删除管理员账号
export function deleteRecommend(data) {
  return request({
    url: '/admin/delete-recommend',
    method: 'post',
    data
  })
}

//编辑二级单位帐号
export function editRecommend(data) {
  return request({
    url: '/admin/edit-recommend',
    method: 'post',
    data
  })
}
export function updateRecommend(data) {
  return request({
    url: '/admin/update-recommend',
    method: 'post',
    data
  })
}

//修改帐号密码
export function editPassword(data) {
  return request({
    url: '/admin/edit-password',
    method: 'post',
    data
  })
}
export function updatePassword(data) {
  return request({
    url: '/admin/update-password',
    method: 'post',
    data
  })
}
export function getUserToDepartments(data) {
  return request({
    url: '/admin/getUserToDepartments',
    method: 'post',
    data
  })
}
