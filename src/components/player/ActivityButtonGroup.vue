<script setup>
defineProps({
    selectedStatus: {
        type: String,
        default: '',
    },
    statusList: {
        type: Array,
        default: () => [{ length: 0, name: '', value: '' }],
    },
});

const emits = defineEmits(['update:selectedStatus']);

const handleSelectStatus = (value) => {
    emits('update:selectedStatus', value);
};
</script>

<template>
    <div class="d-flex activity-button-group-wrap">
        <button
            v-for="(item, index) in statusList"
            :key="index"
            type="button"
            class="btn btn-outline-primary"
            :class="{
                active: item.value === selectedStatus,
            }"
            @click="handleSelectStatus(item.value)"
        >
            {{ item.name }} 共 {{ item.length }} 筆
        </button>
    </div>
</template>

<style scoped>
.activity-button-group-wrap {
    gap: 0 16px;
}
</style>
