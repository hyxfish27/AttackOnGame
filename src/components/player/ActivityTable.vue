<script setup>
import { defineProps, ref, computed } from 'vue';

const currentPage = ref(1);
const itemsPerPage = 3;
const tableTitles = ['活動名稱', '', '時間', '金額', '張數', '訂單編號'];
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
                        {{ title }}
                    </th>
                </tr>
            </thead>
            <tbody v-for="(value, index) in paginatedList" :key="index">
                <tr>
                    <td>
                        <div class="d-flex flex-column align-items-start">
                            <p class="h5 flex-grow-1">活動名稱</p>
                            <!-- 時間 -->
                            <div class="d-flex">
                                <p>2021-09-01</p>
                                <p>19:00~22:00</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="d-flex flex-column">
                            <button
                                type="button"
                                class="btn btn-outline-dark btn-sm mb-2"
                            >
                                前往票卷
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
                    <td>19:00</td>
                    <td>${{ value.payment }}</td>
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
