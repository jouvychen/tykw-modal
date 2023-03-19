/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import notFound from '@/components/Exception/index.vue';
// import systemModule from './modules/systemModule'; // 系统管理

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
      title: '首页',
    },
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
    children: [
      {
        path: '/hello',
        name: 'hello',
        meta: {
          title: '个人中心',
          icon: 'BarsOutlined',
        },
        // redirect: '/personal-set/personal-msg',
        component: () => import(/* webpackChunkName: "about" */ '@/views/car-booth/index.vue'),
        // children: [
        //   {
        //     path: '/personal-set/personal-msg',
        //     name: 'personal-msg',
        //     meta: {
        //       title: '个人信息',
        //     },
        //     component: () => import(/* webpackChunkName: "about" */ '@/views/personal/basic-info.vue'),
        //   },
        // ],
      },
      // ...systemModule,
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: notFound, // 引入 组件
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
