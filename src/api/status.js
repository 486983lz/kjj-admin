import request from '@/utils/request'


export function createStatus(data) {
  return request({
    url: '/admin/status/createStatus',
    method: 'post',
    data
  })
}
export function getStatusList(data) {
  return request({
    url: '/admin/status/getStatusList',
    method: 'post',
    data
  })
}
export function getLibraryAll(data) {
  return request({
    url: '/admin/status/getLibraryAll',
    method: 'post',
    data
  })
}
export function createStatusToLibrary(data) {
  return request({
    url: '/admin/status/createStatusToLibrary',
    method: 'post',
    data
  })
}
export function updateStatusToLibrary(data) {
  return request({
    url: '/admin/status/updateStatusToLibrary',
    method: 'post',
    data
  })
}
export function deleteStatusToLibrary(data) {
  return request({
    url: '/admin/status/deleteStatusToLibrary',
    method: 'post',
    data
  })
}
export function getStatusOption(data) {
  return request({
    url: '/admin/status/getStatusOption',
    method: 'post',
    data
  })
}