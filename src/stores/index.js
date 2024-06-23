import { defineStore } from 'pinia';
import PlayerAPI from '@/api/Player';
import playerAdapter from '@/adapter/player';
import EventAPI from '@/api/Event';
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
        setRole(data) {
            this.userData.roleData = data;
        },
        async getPlayer(userId, router) {
            await PlayerAPI.get(userId)
                .then((res) => {
                    const playerViewObject = playerAdapter.toViewObject(
                        res.data.data
                    );
                    this.setRole(playerViewObject);
                })
                .catch((err) => {
                    console.error(err);
                    alert('取得使用者資料失敗，將轉導至資料編輯頁');
                    router.push({ name: 'PlayerForm' });
                });
        },
        async getStore(userId, router) {
            try {
                const stores = await EventAPI.getStores();
                console.log('stroeData', stores.data);
                const storeId = stores.data.filters(
                    (store) => store.userId === userId
                );
                if (storeId.length === 0) {
                    alert('尚未建立店家資料，將轉導至店家資料建立頁');
                    router.push({ name: 'StoreForm' });
                } else {
                    const storeData = await EventAPI.getStore(storeId[0]._id);
                    this.setRole(storeData);
                }
            } catch (error) {
                console.error(error);
            }
        },
        getUserData() {
            return this.userData;
        },
    },
    persist: {
        key: 'attack-on-game-user',
    },
});
