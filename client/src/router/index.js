import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import store from '../store/index';

// 导入
import 'nprogress/nprogress.css';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'AddUser',
  //   component: () => import('../views/AddUser.vue'),
  // },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/List.vue'),
  },
  {
    path: '/addUser',
    name: 'AddUser',
    component: () => import('../views/AddUser.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/chat/:receiverID',
    name: 'chat',
    component: () => import('../views/Chat.vue'),
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('../views/Discover.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/MY.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  // scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const hasToken = Boolean(store.state.token);
//   NProgress.start();
//   if (hasToken) {
//     next();
//     NProgress.done();
//   } else if ((to.path === '/addUser') || (to.path === '/login')) {
//     next();
//     NProgress.done();
//   } else {
//     next({ path: '/login' });
//     NProgress.done();
//   }
// });

export default router;
