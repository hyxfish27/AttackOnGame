<template>
    <teleport to="body">
        <button class="d-none" @click="open">open modal</button>
        <div
            v-if="showModal"
            class="modal-overlay backdrop-blur"
            @click.self="close"
        >
            <div class="modal-dialog">
                <div class="modal-content noto-serif-tc fw-bold">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                    </div>
                    <div class="modal-body text-grey66 pt-2 pb-4">
                        <p>{{ message }}</p>
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
        </div>
    </teleport>
</template>

<script setup>
import { computed } from 'vue';
import useAlert from '@/stores/alert';

const alert = useAlert();

const showModal = computed(() => alert.showModal);
const message = computed(() => alert.message);
// const type = computed(() => alert.type);

const title = computed(() => {
    switch (alert.type) {
        case 'success':
            return '成功';
        case 'error':
            return '錯誤';
        case 'warning':
            return '警告';
        case 'timeout':
            return '連線逾時';
        default:
            return '提示';
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

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
}
</style>
