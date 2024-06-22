<script setup>
import ActivityTable from '@/components/player/ActivityTable.vue';
import { onMounted, ref } from 'vue';
import Axios from '@/utilities/axios';

const activityList = ref([]);

const getOrderList = async () => {
    const orderList = await Axios.get('api/v1/order/list');

    activityList.value = orderList.data.data;
};

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
                    <div class="d-flex">
                        <button type="button" class="btn btn-outline-primary">
                            即將到來
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-primary ms-2"
                        >
                            已完成
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-primary ms-2"
                        >
                            取消
                        </button>
                    </div>

                    <ActivityTable :activity-list="activityList" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped></style>
