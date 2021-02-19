import request from '@/utils/request'

//获取列表
export function getList(params) {
  return request({
    url: params ? '/admin/System/admin/list?page=' + params : '/admin/System/admin/list',
    method: 'get',
  });
}

//搜索
export function getGroupList(params) {
  return request({
    url: params ? '/admin/System/group/list?page=' + params : '/admin/System/group/list',
    method: 'get',
  });
}

//新增
export function saveForm(params) {
  return request({
    url: '/admin/System/admin/save',
    method: 'post',
    data: { params }
  });
}

//修改
export function upConfig(id,times){
  return request({
    url:'/Ad/adList',
    method: 'get',
    params:{
      id,
      times,
    }
  });
}

