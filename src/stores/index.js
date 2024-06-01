import { defineStore } from 'pinia';
import PlayerAPI from '@/api/Player';

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
        async getPlayer(userId) {
            await PlayerAPI.get(userId)
                .then((res) => {
                    console.log('res', res);
                    this.userData = res.data;
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        getStore(userId) {
            console.log('getStore', userId);
        },
    },
});
