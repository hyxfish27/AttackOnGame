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
    }),
    actions: {
        updateFormData(data) {
            this.formData = data;
        },
    },
    getters: {
        getFormData: (state) => state.formData,
    },
});
export default useFormStore;
