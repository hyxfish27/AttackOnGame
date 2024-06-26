import { defineStore } from 'pinia';

export default defineStore('alter', {
    id: 'alter',
    state: () => ({
        showModal: false,
        message: '',
        type: '',
    }),
    actions: {
        openModal(type, message) {
            this.showModal = true;
            this.message = message;
            this.type = type;
        },
        closeModal() {
            this.showModal = false;
            this.message = '';
            this.type = '';
        },
    },
    persist: {
        key: 'attack-on-game-alter',
    },
});
