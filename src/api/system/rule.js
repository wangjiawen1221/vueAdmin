import request from '@/utils/request'

//获取路由列表
export function getRouterList(params) {
  return request({
    url: params ? '/admin/System/rule/routes?page=' + params : '/admin/System/rule/routes',
    method: 'get',
  });
}

//获取权限列表
export function getMenusList(menu,status) {
  return request({
    url: menu ? '/admin/System/rule/list?menu=' + menu +'status'+status: '/admin/System/rule/list',
    method: 'get',
  });
}

//获取单个菜单
export function getRouterById(params) {
  return request({
    url: params ? '/admin/System/rule/get?id=' + params : '/admin/System/rule/get',
    method: 'get',
  });
}

//删除权限点
export function deleteRouterById(params) {
  return request({
    url: params ? '/admin/System/rule/delete?id=' + params : '/admin/System/rule/delete',
    method: 'post',
    data: { params }
  });
}

//保存或者更新菜单
export function saveForm(params) {
  return request({
    url: '/admin/System/rule/save',
    method: 'post',
    data: { params }
  });
}
