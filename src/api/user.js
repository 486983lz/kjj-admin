import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function signin(data) {
    return request({
        url: '/user/sign-in',
        method: 'post',
        data
    })
}

export function getAdminInfo() {
    return request({
        url: '/user/get-info',
        method: 'post',
    })
}

export function signout() {
    return request({
        url: '/user/sign-out',
        method: 'post'
    })
}