import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    children: [

    ],
  },
  {
    path: '/signup',
    name: 'SignUp',
    // component: () => import('../views/signup/SignUp.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    // component: () => import('../views/login/Login.vue'),
  },
  {
    // 玩家路由
    path: '/player',
    name: 'Player',
    // component: () => import('../views/player/Player.vue'),
    children: [
      {
        path: '/admin',
        name: 'PlayerAdmin',
        // component: () => import('../views/player/PlayerAdmin.vue'),
      },
      {
        path: '/login',
        name: 'PlayerLogin',
        // component: () => import('../views/player/Login.vue'),
      },
      {
        path: '/signup',
        name: 'PlayerSignUp',
        // component: () => import('../views/player/SignUp.vue'),
      },
      {
        path: '/signup/confirm',
        name: 'PlayerSignUpConfirm',
        // component: () => import('../views/player/SignUpConfirm.vue'),
      },
    ],
  },
  {
    // 商家路由
    path: '/store',
    children: [
      {
        path: '/admin',
        name: 'StoreAdmin',
        // component: () => import('../views/store/StoreAdmin.vue'),
      },
      {
        path: '/login',
        name: 'StoreLogin',
        // component: () => import('../views/store/Login.vue'),
      },
      {
        path: '/signup',
        name: 'StoreSignUp',
        // component: () => import('../views/store/SignUp.vue'),
      },
      {
        path: '/signup/confirm',
        name: 'StoreSignUpConfirm',
        // component: () => import('../views/store/SignUpConfirm.vue'),
      },
    ],
  },
  {
    path: '/password',
    name: 'Password',
    // component: () => import('../views/Password.vue'),
    children: [
      {
        path: '/forget',
        name: 'PasswordForget',
        // component: () => import('../views/password/PasswordForget.vue'),
      },
      {
        path: '/change',
        name: 'PasswordChange',
        // component: () => import('../views/password/PasswordChange.vue'),
      },
      {
        path: '/setting',
        name: 'PasswordSetting',
        // component: () => import('../views/password/PasswordSetting.vue'),
      },
      {
        path: '/success',
        name: 'PasswordSuccess',
        // component:()=>import('../views/password/PasswordSuccess.vue')
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
