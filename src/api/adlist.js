import request from '@/utils/request'

//获取
export function getList(params) {
  return request({
    url: params ? '/Ad/adList?page='+params : '/Ad/adList',
    method: 'get'
  });
}

//搜索
export function getSearchList(params) {
  return request({
    url: params ? '/Ad/adList?keywords='+params : '/Ad/adList',
    method: 'get'
  });
}

//新增
export function insertList({params}) {
  return request({
    url: 'http://47.111.65.117/vueApi/public/api/v1/Ad/editAd',
    method: 'post',
    params: {params}
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

