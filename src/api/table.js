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

//开启采集
export function startCollect(id){
  return request({
    url:'/Supplier/StartCollect',
    method: 'post',
    params:{
      id
    }
  });
}

//关闭采集
export function stopCollect(id){
  return request({
    url:'/Supplier/StopCollect',
    method: 'post',
    params:{
      id
    }
  });
}
