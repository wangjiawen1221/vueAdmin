import request from '@/utils/request'

//获取数据
export function getProfile() {
  return request({
    url: '/admin/System/admin/profile/get',
    method: 'get',
  });
}

//上传头像
export function uploadAvatar(params) {
  return request({
    url: '/admin/System/admin/avatar/save',
    method: 'post',
    data: { params }
  });
}

//重置密码
export function resetPassword(params) {
  return request({
    url: '/admin/System/admin/password/change',
    method: 'post',
    data: { params }
  });
}
