import request from '@/utils/request'

//获取列表
export function getList(params) {
  return request({
    url: params ? '/admin/System/group/list?page=' + params : '/admin/System/group/list',
    method: 'get',
  });
}

//获取权限列表
export function getRulesList(params) {
  return request({
    url: params ? '/admin/System/rule/list?status=' + params : '/admin/System/group/list',
    method: 'get',
  });
}

//保存管理组
export function saveForm(params) {
  return request({
    url: '/admin/System/group/save',
    method: 'post',
    data: { params }
  });
}
