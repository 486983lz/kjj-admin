import request from '@/utils/request'


export function uploadTinymceImg(data) {
  return request({
    url: '/admin/notice/uploadTinymceImg',
    method: 'post',
    data
  })
}
export function postNoticeInfo(data) {
  return request({
    url: '/admin/notice/postNoticeInfo',
    method: 'post',
    data
  })
}
export function getNoticeList(data) {
  return request({
    url: '/admin/notice/getNoticeList',
    method: 'post',
    data
  })
}
export function getNoticeInfo(data) {
  return request({
    url: '/admin/notice/getNoticeInfo',
    method: 'post',
    data
  })
}
export function updateNoticeInfo(data) {
  return request({
    url: '/admin/notice/updateNoticeInfo',
    method: 'post',
    data
  })
}

