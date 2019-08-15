import request from '@/utils/request'


//获取
export function getList(params) {
  return request({
    url: params ? '/Count/countList?page='+params : '/Count/countList',
    method: 'get'
  });
}
