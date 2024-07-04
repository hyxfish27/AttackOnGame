<template>
    <div ref="modal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div v-html="text"></div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="myModalHide()"
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Modal from 'bootstrap/js/dist/modal';

defineProps({
    title: { type: String, default: '' },
    text: { type: String, default: '' },
});
const modal = ref(null);
const myModal = ref(null);

onMounted(() => {
    myModal.value = new Modal(modal.value);
});

const myModalShow = () => {
    myModal.value.show();
};

const myModalHide = () => {
    myModal.value.hide();
};

defineExpose({
    myModalShow,
    myModalHide,
});
</script>
