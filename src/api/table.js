import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/Supplier/Index',
    method: 'get',
    params
  });
}

//编辑修改配置
export function upConfig(id,times){
  return request({
    url:'/Supplier/UpConfig',
    method: 'post',
    params:{
      id,
      times,
    }
  });
}
