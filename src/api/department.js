import request from '@/utils/request'

//添加归口科室
export function saveDepartment(data) {
  return request({
    url: '/department/save-department',
    method: 'post',
    data
  })
}

//查看归口科室
export function getAllDepartment(data) {
  return request({
    url: '/department/get-all-department',
    method: 'post',
    data
  })
}

//编辑归口科室
export function editDepartment(data) {
  return request({
    url: '/department/edit-department',
    method: 'post',
    data
  })
}
export function updateDepartment(data) {
  return request({
    url: '/department/update-department',
    method: 'post',
    data
  })
}

export function allDepartment(data) {
  return request({
    url: '/department/all-department',
    method: 'post',
    data
  })
}

//查看归口科室账号
export function getAccounts(data) {
  return request({
    url: '/department/get-accounts',
    method: 'post',
    data
  })
}

