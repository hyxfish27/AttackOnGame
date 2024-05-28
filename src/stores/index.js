import { defineStore } from 'pinia';

export default defineStore('index', {
    id: 'index',
    state: () => ({ isLogin: false }),
    actions: {
        setIsLogin(value) {
            this.isLogin = value;
        },
    },
});
