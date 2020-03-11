import request from '@/utils/request'


export function uploadTinymceImg(data) {
  return request({
    url: '/recommend/notice/uploadTinymceImg',
    method: 'post',
    data
  })
}
export function postNoticeInfo(data) {
  return request({
    url: '/recommend/notice/postNoticeInfo',
    method: 'post',
    data
  })
}

