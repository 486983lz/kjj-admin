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

