import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '管理后台',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/example',
    component: Layout,
    name: '列表管理',
    meta: { title: '列表管理', icon: 'example' },
    children: [
      // {
      //   path: 'table',
      //   name: '采集列表',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: '采集列表', icon: 'table' }
      // },
      {
        path: 'adlist',
        name: '广告列表',
        component: () => import('@/views/adlist/index'),
        meta: { title: '广告列表', icon: 'table' }
      },
      {
        path: 'count',
        name: '统计上传',
        component: () => import('@/views/count/index'),
        meta: { title: 'Count', icon: 'tree' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: '系统设置',
    meta: { title: '系统设置', icon: 'example' },
    children: [
      {
        name: 'group',
        path: '/system/group',
        component: () => import('@/views/system/group'),
      },
      {
        path: '/system/rule',
        name: 'rule',
        component: () => import('@/views/system/rule'),
      },
      {
        name: 'admin',
        path: '/system/admin',
        component: () => import('@/views/system/admin')
      },
      {
        name: 'profile',
        path: '/system/profile',
        component: () => import('@/views/system/profile')
      },
      {
        name: 'logslist',
        path: '/system/logs',
        component: () => import('@/views/system/logs')
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
];

export const vueRoutes = {
  home: {
    path: '/',
    name: 'home',
    meta: { title: '主页' },
    component: () => import('@/views/system/rule'),
  },
  rule: {
    path: 'rule',
    name: '权限管理',
    meta: { title: '权限管理' },
    component: () => import('@/views/system/rule'),
  },
  admin: {
    path: 'admin',
    name: '管理员',
    meta: { title: '管理员' },
    component: () => import('@/views/system/admin'),
  },
  profile: {
    path: 'profile',
    name: '管理员设置',
    meta: { title: '管理员设置' },
    component: () => import('@/views/system/profile'),
  },
  logs: {
    path: 'logslist',
    name: '日志设置',
    meta: { title: '日志设置' },
    component: () => import('@/views/system/logs'),
  },
};

const createRouter = (router) => new Router({
  // mode: 'history',
  routes: router,
})

const router = createRouter(constantRouterMap)

export function resetRouter(router) {
  const newRouter = createRouter(router)
  router.matcher = newRouter.matcher
}

export default router
// 异步挂载的路由
// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

