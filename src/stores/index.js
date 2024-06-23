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
        playerData: {},
        storeData: {},
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
        setStore(data) {
            this.storeData = data;
        },
        async getPlayer(userId, router) {
            try {
                const res = await PlayerAPI.get(userId);
                const playerViewObject = playerAdapter.toViewObject(
                    res.data.data
                );
                this.setPlayer(playerViewObject);
                return true;
            } catch (error) {
                console.error(error);
                alert('取得使用者資料失敗，將轉導至資料編輯頁');
                router.push({ name: 'PlayerForm' });
                return false;
            }
        },
        async getStore(userId, router) {
            try {
                const stores = await EventAPI.getStores();
                const storeId = stores.data.filter(
                    (store) => store.user === userId
                );
                console.log('storeId', storeId, 'stores', stores.data);
                if (storeId.length === 0) {
                    alert('尚未建立店家資料，將轉導至店家資料建立頁');
                    router.push({ name: 'StoreForm' });
                    return false;
                }
                const storeData = await EventAPI.getStore(storeId[0]._id);
                this.setStore(storeData);
                return true;
            } catch (error) {
                console.error(error);
                return false;
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
