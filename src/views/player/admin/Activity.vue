<script setup>
import ActivityTable from '@/components/player/ActivityTable.vue';
import ActivityButtonGroup from '@/components/player/ActivityButtonGroup.vue';
import { onMounted, ref, computed } from 'vue';
import Axios from '@/utilities/axios';
import Status from '@/constant/orderStatus';

const activityList = ref([]);
const selectedStatus = ref(Status.UNUSED);
const getOrderList = async () => {
    const orderList = await Axios.get('api/v1/order/list');
    activityList.value = orderList.data.data;
};
const filteredActivityList = computed(() => {
    return activityList.value.filter(
        (activity) => activity.status === selectedStatus.value
    );
});

onMounted(() => {
    getOrderList();
});
</script>

<template>
    <main class="container py-4 d-flex flex-column flex-grow-1">
        <div class="row gx-2 flex-grow-1">
            <div class="col-4">
                <div class="p-3 border rounded">Custom column padding</div>
            </div>
            <div class="col-8">
                <div class="d-flex p-3 border rounded h-100 flex-column">
                    <!-- table title -->
                    <div class="border-bottom py-2 mb-2">
                        <h7>活動管理</h7>
                    </div>
                    <!-- button group -->
                    <ActivityButtonGroup
                        :selected-status="selectedStatus"
                        @update:selectedStatus="selectedStatus = $event"
                    />

                    <ActivityTable :activity-list="filteredActivityList" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
