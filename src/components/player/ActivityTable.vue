<script setup>
import dayjs from 'dayjs';
import { defineProps, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import toLocalString from '@/utilities/toLocalString';

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
</script>

<template>
    <div class="d-flex flex-column justify-content-between flex-grow-1">
        <!-- table -->
        <table class="table align-middle table-hover mt-3">
            <thead>
                <tr>
                    <th
                        v-for="(title, index) in tableTitles"
                        :key="index"
                        scope="col"
                    >
                        <p class="line-clamp line-clamp-2">{{ title }}</p>
                    </th>
                </tr>
            </thead>
            <tbody v-for="(value, index) in paginatedList" :key="index">
                <tr>
                    <td class="w-40">
                        <div class="d-flex flex-column align-items-start">
                            <p class="fs-8 fw-bold">{{ value.title }}</p>
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
                                class="btn btn-outline-dark btn-sm mb-2"
                                @click="goTicket(value.idNumber)"
                            >
                                前往票券
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

        <!-- pafination -->
        <nav>
            <ul class="pagination justify-content-end m-auto">
                <li
                    class="page-item me-3"
                    :class="{ disabled: currentPage === 1 }"
                >
                    <a
                        class="page-link"
                        href="#"
                        aria-label="Previous"
                        @click.prevent="currentPage > 1 && currentPage--"
                    >
                        <span aria-hidden="true">&lt;</span>
                    </a>
                </li>
                <li
                    v-for="page in totalPages"
                    :key="page"
                    class="page-item"
                    :class="{ active: page === currentPage }"
                >
                    <a
                        class="page-link rounded me-3 border-dark"
                        href="#"
                        @click.prevent="currentPage = page"
                        >{{ page }}</a
                    >
                </li>
                <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPages }"
                >
                    <a
                        class="page-link"
                        href="#"
                        aria-label="Next"
                        @click.prevent="
                            currentPage < totalPages && currentPage++
                        "
                    >
                        <span aria-hidden="true">&gt;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
.my-component {
    /* 在這裡為你的組件添加樣式 */
    padding: 20px;
    background-color: #f0f0f0;
}
</style>
