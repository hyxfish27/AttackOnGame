<script setup>
import Status from '@/constant/orderStatus';

defineProps({
    selectedStatus: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(['update:selectedStatus']);

const status = [
    { name: '即將到來', value: Status.UNUSED },
    { name: '已完成', value: Status.USED },
    { name: '取消', value: Status.CANCEL },
];

const handleSelectStatus = (value) => {
    emits('update:selectedStatus', value);
};
</script>

<template>
    <div class="d-flex">
        <button
            v-for="(item, index) in status"
            :key="index"
            type="button"
            class="btn btn-outline-primary"
            :class="{
                active: item.value === selectedStatus,
                'me-2': index !== status.length - 1,
            }"
            @click="handleSelectStatus(item.value)"
        >
            {{ item.name }}
        </button>
    </div>
</template>
