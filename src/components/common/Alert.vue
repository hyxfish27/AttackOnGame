<template>
    <teleport to="body">
        <button @click="open">open modal</button>
        <div
            v-if="showModal"
            class="modal-overlay backdrop-blur error-msg-modal"
            @click.self="close"
        >
            <div
                class="modal-dialog py-3 px-4 bg-white shadow border h-30 rounded-2"
            >
                <div class="d-flex align-items-center error-msg-modal-body">
                    <div
                        class="d-flex align-items-center mb-3 noto-serif-tc"
                        :class="`text-${responseType.color}`"
                    >
                        <span class="material-symbols-outlined"> error </span>
                        <p
                            class="noto-serif-tc"
                            :class="`text-${responseType.color}`"
                        >
                            {{ responseType.value }}:
                        </p>
                    </div>
                    <div class="text-primary d-flex align-items-center mb-3">
                        <p class="flex-grow-1 text fw-bold">
                            {{ message }}
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="close"
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { computed } from 'vue';
import useAlert from '@/stores/alert';

const alert = useAlert();
const DEFAULT_ERROR_MESSAGE = '來自宇宙的訊息';
const showModal = computed(() => true);
const message = computed(() => alert.message || DEFAULT_ERROR_MESSAGE);
// const type = computed(() => alert.type);

const responseType = computed(() => {
    switch (alert.type) {
        case 'success':
            return {
                icon: 'sentiment_satisfied',
                value: '成功',
                color: 'success',
            };
        case 'error':
            return { icon: 'error', value: '錯誤', color: 'danger' };
        case 'warning':
            return { icon: 'warning', value: '警告', color: 'warning' };
        case 'timeout':
            return {
                icon: 'sentiment_very_dissatisfied',
                value: '連線逾時',
                color: 'grey9F',
            };
        default:
            return { icon: 'info', value: '提示', color: 'info' };
    }
});

const close = () => {
    if (alert.type === 'timeout') {
        alert.closeModal();
        return window.location.reload();
    }
    return alert.closeModal();
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
.error-msg-modal-body {
    gap: 0 8px;
}
.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
}
</style>
