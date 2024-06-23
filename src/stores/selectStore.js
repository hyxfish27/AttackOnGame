import { defineStore } from 'pinia';

export const selectStoreData = defineStore('form', {
    state: () => ({
        selectStore: {
            _id: '',
            userId: '',
        },
    }),
    actions: {
        updateSelectStoreData(data) {
            this.selectStore = data;
        },
    },
    getters: {
        getSelectStoreData: (state) => state.selectStore,
    },
    persist: {
        key: 'select-store-data',
    },
});
export default selectStoreData;
