<script setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
    activityList: {
        type: Array,
        required: true,
    },
});

onMounted(() => {
    console.log(props.activityList);
});

const tableTitles = ['活動名稱', '', '時間', '金額', '張數', '訂單編號'];
</script>

<template>
    <div class="d-flex flex-column justify-content-between h-100">
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
            <tbody v-for="(value, index) in activityList" :key="index">
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
            <ul class="pagination">
                <li class="page-item disabled me-2">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
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
