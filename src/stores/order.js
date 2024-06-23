import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
    state: () => ({
        formData: {
            title: '',
            address: '',
            startTime: '',
            endTime: '',
            userName: '',
            phoneNum: '',
            personNum: 1,
            note: '',
            payPrice: 0,
        },
        isNew: true,
        orderData: {
            MerchantID: '',
            TradeInfo: '',
            TradeSha: '',
            Version: '',
        },
    }),
    actions: {
        updateFormData(data) {
            this.formData = data;
        },
        updateOrderData(data) {
            this.orderData = data;
        },
        setState(state) {
            this.isNew = state;
            if (this.isNew === true) {
                this.formData = {
                    title: '',
                    address: '',
                    startTime: '',
                    endTime: '',
                    userName: '',
                    phoneNum: '',
                    personNum: 1,
                    note: '',
                    payPrice: 0,
                };
                this.orderData = {
                    MerchantID: '',
                    TradeInfo: '',
                    TradeSha: '',
                    Version: '',
                };
            }
        },
    },
    getters: {
        getFormData: (state) => state.formData,
        getOrderData: (state) => state.orderData,
        getFormState: (state) => state.isNew,
    },
    persist: {
        key: 'player-order-form-data',
    },
});
export default useFormStore;
