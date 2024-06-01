import { defineStore } from 'pinia';
import PlayerAPI from '@/api/Player';
// import { useRouter } from 'vue-router';

// const router = useRouter();

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
        async getPlayer(userId, router) {
            await PlayerAPI.get(userId)
                .then((res) => {
                    console.log('res', res);
                    this.userData = res.data;
                })
                .catch((err) => {
                    console.error(err);
                    alert('取得使用者資料失敗，將轉導至資料編輯頁');
                    // console.log('router', router);
                    router.push({ name: 'PlayerForm' });
                });
        },
        getStore(userId) {
            console.log('getStore', userId);
        },
    },
});
