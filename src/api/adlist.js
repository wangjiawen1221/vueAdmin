import request from '@/utils/request'

//获取
export function getList(params) {
  return request({
    url: params ? '/Ad/AdList?page='+params : '/Ad/AdList',
    method: 'get'
  });
}

//搜索
export function getSearchList(params) {
  return request({
    url: params ? '/Ad/AdList?keywords='+params : '/Ad/AdList',
    method: 'get'
  });
}

//新增
export function insertList({params}) {
  return request({
    url: 'http://47.74.236.131/vueApi/public/api/v1/Ad/editAd',
    method: 'post',
    params: {params}
  });
}

//修改
export function upConfig(id,times){
  return request({
    url:'/Ad/AdList',
    method: 'post',
    params:{
      id,
      times,
    }
  });
}

