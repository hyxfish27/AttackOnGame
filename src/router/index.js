import { createRouter, createWebHashHistory } from 'vue-router';
import useIndexStore from '@/stores/index';
import useAlert from '@/stores/alert';

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/views/layout/Layout.vue'),
        children: [
            {
                path: '/',
                name: 'Index',
                component: () => import('@/views/Index.vue'),
                children: [],
            },
            {
                path: 'search',
                name: 'Search',
                component: () => import('@/views/Search.vue'),
            },
            {
                path: 'event-list',
                name: 'EventList',
                component: () => import('@/views/EventList.vue'),
            },
            {
                path: 'store-list',
                name: 'StoreList',
                component: () => import('@/views/StoreList.vue'),
            },
            {
                path: 'search/event/:eventId',
                name: 'SingleEvent',
                component: () => import('@/views/preLogin/SingleEvent.vue'),
            },
            {
                path: 'search/store/:userId',
                name: 'StoreIntroduction',
                component: () =>
                    import('@/views/preLogin/StoreIntroduction.vue'),
            },
            {
                path: '/signup',
                name: 'SignUp',
                component: () => import('@/views/signup/SignUp.vue'),
            },
            {
                path: '/login',
                name: 'Login',
                component: () => import('@/views/login/Login.vue'),
            },
            {
                // 玩家路由
                path: '/player',
                name: 'Player',
                component: () => import('@/views/player/Player.vue'),
                meta: { requiresAuth: true, roles: ['player'] },
                children: [
                    {
                        path: 'admin',
                        name: 'PlayerAdmin',
                        component: () =>
                            import('@/views/player/admin/Admin.vue'),
                        children: [
                            // {
                            //     path: '',
                            //     component: () => import('@/views/Index.vue'),
                            // },
                            {
                                path: 'checkout/:eventId',
                                name: 'Checkout',
                                component: () =>
                                    import('@/views/player/admin/Checkout.vue'),
                            },
                            {
                                path: 'recheckout/:eventId',
                                name: 'ReCheckout',
                                component: () =>
                                    import(
                                        '@/views/player/admin/ReCheckout.vue'
                                    ),
                            },
                            {
                                path: 'checkout/fail',
                                name: 'CheckoutFail',
                                component: () =>
                                    import(
                                        '@/views/player/admin/CheckoutFail.vue'
                                    ),
                            },
                            {
                                path: 'checkout/success',
                                name: 'CheckoutSuccess',
                                component: () =>
                                    import(
                                        '@/views/player/admin/CheckoutSuccess.vue'
                                    ),
                            },
                            {
                                path: 'activity',
                                name: 'PlayerActivity',
                                component: () =>
                                    import('@/views/player/admin/Activity.vue'),
                            },
                            {
                                path: 'ticket/:idNumber',
                                name: 'PlayerTicket',
                                component: () =>
                                    import('@/views/player/admin/Ticket.vue'),
                            },
                            {
                                path: '',
                                name: 'PlayerAdminId',
                                component: () =>
                                    import(
                                        '@/views/player/admin/PlayerAdmin.vue'
                                    ),
                            },
                        ],
                    },
                    {
                        path: '',
                        name: 'PlayerIndex',
                        component: () => import('@/views/Index.vue'),
                    },

                    {
                        path: 'login',
                        name: 'PlayerLogin',
                        component: () => import('@/views/player/Login.vue'),
                        meta: { requiresAuth: false },
                    },
                    {
                        path: 'signup',
                        name: 'PlayerSignUp',
                        component: () => import('@/views/player/SignUp.vue'),
                        meta: { requiresAuth: false },
                    },
                    {
                        path: 'form',
                        name: 'PlayerForm',
                        component: () => import('@/views/player/Form.vue'),
                    },
                ],
            },
            {
                // 商家路由
                path: '/store',
                name: 'Store',
                component: () => import('@/views/store/Store.vue'),
                meta: { requiresAuth: true, roles: ['store'] },
                children: [
                    {
                        path: 'admin',
                        name: 'StoreAdmin',
                        component: () =>
                            import('@/views/store/admin/Admin.vue'),
                        children: [
                            {
                                path: '',
                                name: 'StoreAdminId',
                                component: () =>
                                    import(
                                        '@/views/store/admin/StoreAdmin.vue'
                                    ),
                            },
                            {
                                path: 'activity-list',
                                name: 'StoreActivityList',
                                component: () =>
                                    import(
                                        '@/views/store/admin/ActivityList.vue'
                                    ),
                            },
                            {
                                path: 'activity/:idNumber',
                                name: 'StoreActivity',
                                component: () =>
                                    import('@/views/store/admin/Activity.vue'),
                            },
                            {
                                path: 'activity-edit',
                                name: 'StoreActivityEdit',
                                component: () =>
                                    import(
                                        '@/views/store/admin/EditActivity.vue'
                                    ),
                            },
                            {
                                path: 'ticket-list/:idNumber',
                                name: 'ScannerTicket',
                                component: () =>
                                    import(
                                        '@/views/store/admin/ScannerTicket.vue'
                                    ),
                            },
                        ],
                    },
                    {
                        path: 'login',
                        name: 'StoreLogin',
                        component: () => import('@/views/store/Login.vue'),
                        meta: { requiresAuth: false },
                    },
                    {
                        path: 'signup',
                        name: 'StoreSignUp',
                        component: () => import('@/views/store/SignUp.vue'),
                        meta: { requiresAuth: false },
                    },
                    {
                        path: 'form',
                        name: 'StoreForm',
                        component: () => import('@/views/store/Form.vue'),
                    },
                ],
            },
            {
                path: '/password',
                name: 'Password',
                // component: () => import('../views/Password.vue'),
                children: [
                    {
                        path: 'forget',
                        name: 'PasswordForget',
                        component: () =>
                            import('@/views/password/PasswordForget.vue'),
                    },
                    {
                        path: 'change',
                        name: 'PasswordChange',
                        // component: () => import('../views/password/PasswordChange.vue'),
                    },
                    {
                        path: 'setting',
                        name: 'PasswordSetting',
                        // component: () => import('../views/password/PasswordSetting.vue'),
                    },
                    {
                        path: 'success',
                        name: 'PasswordSuccess',
                        // component:()=>import('../views/password/PasswordSuccess.vue')
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'active',
    routes,
    scrollBehavior() {
        // 每次路由變化時都會滾動到頂部
        return { top: 0, behavior: 'smooth' };
    },
});

// 路由保護

router.beforeEach((to, from, next) => {
    const indxStore = useIndexStore();
    const alterStore = useAlert();
    const { isLogin, userData } = indxStore;
    const { roles, requiresAuth } = to.meta;

    if (requiresAuth) {
        if (isLogin) {
            if (roles) {
                if (roles.includes(userData.role)) {
                    next();
                } else {
                    if (userData.role === 'player') {
                        alterStore.openModal(
                            'error',
                            '你不是商家，需要商家權限'
                        );
                    }
                    if (userData.role === 'store') {
                        alterStore.openModal(
                            'error',
                            '你不是玩家，需要玩家權限'
                        );
                    }
                    next({ name: 'Index' });
                }
            } else {
                // console.log('不需要權限');
                next();
            }
        } else {
            alterStore.openModal('', '請先登入');
            next({ name: 'Login' });
        }
    } else {
        // console.log('不需要驗證');
        next();
    }
});

export default router;
