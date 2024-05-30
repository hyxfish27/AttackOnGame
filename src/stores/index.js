import { defineStore } from 'pinia';

export default defineStore('index', {
    id: 'index',
    state: () => ({
        isLogin: false,
        userData: {},
    }),
    actions: {
        setIsLogin(value) {
            this.isLogin = value;
        },
        setUser(data) {
            this.userData = data;
        },
    },
});
