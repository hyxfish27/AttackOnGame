<script setup>
import dayjs from '@/utilities/dayjs';
import { defineProps, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import toLocalString from '@/utilities/toLocalString';
import EmptyTable from '@/components/common/EmptyTable.vue';
import Pagination from '@/components/common/Pagination.vue';

const PaymentStatus = {
    pending: '尚未付款',
    completed: '已付款',
    failed: '付款失敗',
};
const currentPage = ref(1);
const itemsPerPage = 5;
const tableTitles = ['活動名稱', '', '付款狀態', '金額', '張數', '訂單編號'];
const props = defineProps({
    activityList: {
        type: Array,
        required: true,
    },
});

const totalPages = computed(() => {
    return Math.ceil(props.activityList.length / itemsPerPage);
});

const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return props.activityList.slice(start, end);
});
const setStatus = (x) => {
    return PaymentStatus[x];
};
const formatTime = (start, end) => {
    const Date = dayjs(start).format('YYYY-MM-DD');
    const startTime = dayjs(start).format('HH:mm');
    const endTime = dayjs(end).format('HH:mm');
    return `${Date} ${startTime} ~ ${endTime}`;
};

const router = useRouter();
const goTicket = (idNumber) => {
    router.push({
        name: 'PlayerTicket',
        params: { idNumber },
    });
};
function handlePageChange(newPage) {
    currentPage.value = newPage;
}
</script>

<template>
    <div
        class="d-flex flex-column justify-content-between flex-grow-1 activity-page-table-wrap"
    >
        <!-- table -->
        <table class="table align-middle table-hover mt-3">
            <thead>
                <tr>
                    <th
                        v-for="(title, index) in tableTitles"
                        :key="index"
                        scope="col"
                    >
                        <p class="">{{ title }}</p>
                    </th>
                </tr>
            </thead>
            <EmptyTable
                v-if="activityList.length === 0"
                :length="tableTitles.length"
                text="目前還沒有相關的訂單唷"
            ></EmptyTable>
            <tbody v-for="(value, index) in paginatedList" v-else :key="index">
                <tr>
                    <td class="w-40">
                        <div class="d-flex flex-column align-items-start">
                            <p class="fs-8 fw-bold line-clamp line-clamp-2">
                                {{ value.title }}
                            </p>
                            <!-- 時間 -->
                            <div class="d-flex">
                                <p>
                                    {{
                                        formatTime(
                                            value.eventStartTime,
                                            value.eventEndTime
                                        )
                                    }}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td width="100">
                        <div class="d-flex flex-column">
                            <button
                                type="button"
                                class="btn btn-outline-dark btn-sm mb-2 d-flex align-items-center justify-content-between"
                                @click="goTicket(value.idNumber)"
                            >
                                <span
                                    class="material-symbols-outlined qrcode-style"
                                >
                                    qr_code
                                </span>
                                <p class="flex-grow-1">
                                    前往 <span class="d-block">票券 </span>
                                </p>
                            </button>
                            <button
                                v-if="value.status === '已使用'"
                                type="button"
                                class="btn btn-outline-dark btn-sm"
                            >
                                前往評價
                            </button>
                        </div>
                    </td>
                    <td>{{ setStatus(value.paymentStatus) }}</td>
                    <td>${{ toLocalString(value.totalAmount) }}</td>
                    <td>{{ value.registrationCount }}張</td>
                    <td>{{ value.idNumber }}</td>
                </tr>
            </tbody>
        </table>
        <nav v-if="activityList.length > 0">
            <Pagination
                :current-page="currentPage"
                :total-pages="totalPages"
                @update:currentPage="handlePageChange"
            />
        </nav>
    </div>
</template>

<style scoped lang="scss">
.my-component {
    padding: 20px;
    background-color: #f0f0f0;
}

.activity-page-table-wrap {
    .qrcode-style {
        position: relative;
    }
}
</style>
