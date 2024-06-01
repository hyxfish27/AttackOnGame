import { defineStore } from 'pinia';
import PlayerAPI from '@/api/Player';
import playerAdapter from '@/adapter/player';
// import { useRouter } from 'vue-router';

// const router = useRouter();

export default defineStore('index', {
    id: 'index',
    state: () => ({
        isLogin: false,
        userData: {},

        // TODO: 先用 playerData 來接，之後重新整理資料
        playerData: [],
    }),
    actions: {
        setIsLogin(value) {
            this.isLogin = value;
        },
        setUser(data) {
            this.userData = data;
        },
        setPlayer(data) {
            this.playerData = data;
        },
        async getPlayer(userId, router) {
            await PlayerAPI.get(userId)
                .then((res) => {
                    const playerViewObject = playerAdapter.toViewObject(
                        res.data.data
                    );
                    this.setPlayer(playerViewObject);
                })
                .catch((err) => {
                    console.error(err);
                    alert('取得使用者資料失敗，將轉導至資料編輯頁');
                    router.push({ name: 'PlayerForm' });
                });
        },
        getStore(userId) {
            console.log('getStore', userId);
        },
    },
});
