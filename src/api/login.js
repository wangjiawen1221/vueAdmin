import request from '@/utils/request'

export function login(name, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      name,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/System/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: 'admin/logout',
    method: 'post',
    data: { token }
  })
}
