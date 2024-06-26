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
    }),
    actions: {
        updateFormData(data) {
            this.formData = data;
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
            }
        },
    },
    getters: {
        getFormData: (state) => state.formData,
        getFormState: (state) => state.isNew,
    },
    persist: {
        key: 'player-order-form-data',
    },
});
export default useFormStore;
