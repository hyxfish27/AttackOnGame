<template class="">
    <div class="bg-greyF7 min-full-screen-with-footer">
        <div class="container pb-5">
            <div class="row py-7 justify-content-center">
                <div
                    class="col-7 d-flex gap-2 border-bottom border-primary py-3 px-0 noto-serif-tc"
                >
                    <select
                        id="selectCity"
                        v-model="selectedType"
                        class="form-select w-25 bg-greyF7 border-0 fw-bold text-primary"
                        required=""
                    >
                        <option selected value="searchEvent">尋找活動</option>
                        <option value="searchStore">尋找店家</option>
                    </select>
                    <input
                        id="validationCustom01"
                        v-model="inputValue"
                        type="text"
                        class="form-control py-2"
                        placeholder="輸入關鍵字"
                    />
                </div>
            </div>
            <div class="d-flex justify-content-between border-bottom">
                <div class="border-bottom border-primary">
                    <select
                        id="selectStatus"
                        v-model="selectedStatus"
                        class="form-select bg-greyF7 border-0 fw-bold text-primary"
                    >
                        <option selected :value="0">全部狀態</option>
                        <option :value="1">未成團</option>
                        <option :value="2">已成團</option>
                        <option :value="3">已滿團</option>
                    </select>
                </div>
                <div class="d-flex align-items-center">
                    <button
                        type="submit"
                        class="btn btn-primary mb-2"
                        @click="changeSortBy"
                    >
                        排序按照： {{ sortBy.text }}
                    </button>
                    <span
                        class="material-symbols-outlined cursor text-primary pb-2"
                        @click="changeSortOrder"
                    >
                        {{ sortOrderIcon }}
                    </span>
                </div>
            </div>
            <div v-if="loading" class="text-center mt-4">
                <div class="spinner-border" role="status"></div>
            </div>
            <div v-if="errorMessage.split()" class="text-center mt-4">
                <p>{{ errorMessage }}</p>
            </div>
            <div v-if="paginatedList.length > 0">
                <EventPanel
                    class="mt-4"
                    :data="paginatedList"
                    :keywords="keywords"
                ></EventPanel>
                <Pagination
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @update:currentPage="handlePageChange"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
import EventAPI from '@/api/Event';
import Pagination from '@/components/common/Pagination.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import _debounce from 'lodash/debounce';
import EventPanel from '../components/event/EventPanel.vue';
import { SORT_BY, SORT_ORDER } from '../constant/eventList';

const PER_PAGE = 8;
const SORT_BY_MAP = {
    eventStartTime: {
        value: 'eventStartTime',
        text: '活動時間',
    },
    participationFee: {
        value: 'participationFee',
        text: '活動費用',
    },
};
const SORT_ORDER_ICON_MAP = {
    desc: 'arrow_drop_down',
    asc: 'arrow_drop_up',
};
const sortByKeys = Object.keys(SORT_BY_MAP);
const sortBy = ref(SORT_BY_MAP[SORT_BY]);
const sortOrder = ref(SORT_ORDER);
function changeSortBy() {
    const currentIndex = sortByKeys.indexOf(sortBy.value.value);
    const nextIndex = (currentIndex + 1) % sortByKeys.length;
    sortBy.value = SORT_BY_MAP[sortByKeys[nextIndex]];
}
function changeSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    return sortOrder.value;
}
const currentPage = ref(1);
const loading = ref(true);
const errorMessage = ref('');
const inputValue = ref('');
const keywords = ref('');
const router = useRouter();
const selectedType = ref('searchEvent');
const selectedStatus = ref(0);
const rawEventData = ref([]);
const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    return rawEventData.value.slice(start, end);
});
const getEvent = async (query = {}) => {
    loading.value = true;
    errorMessage.value = '';
    await EventAPI.getEvents(query)
        .then((res) => {
            rawEventData.value = res.data;
        })
        .catch((err) => {
            rawEventData.value = [];
            errorMessage.value =
                err?.data?.message || '連線逾時，靜待雲端伺服器睡醒';
        })
        .finally(() => {
            loading.value = false;
        });
};

const registrationStatus = computed(() => {
    return selectedStatus.value !== 0 ? 2 : 0;
});
const sortOrderIcon = computed(() => {
    return SORT_ORDER_ICON_MAP[sortOrder.value];
});
const query = computed(() => ({
    formationStatus: selectedStatus.value,
    registrationStatus: registrationStatus.value,
    sortBy: sortBy.value.value,
    sortOrder: sortOrder.value,
    keyword: keywords.value,
}));
function handlePageChange(newPage) {
    currentPage.value = newPage;
}
const totalPages = computed(() => {
    return Math.ceil(rawEventData.value.length / PER_PAGE);
});
watch(
    query,
    (newQuery) => {
        getEvent(newQuery);
    },
    { deep: true }
);

watch(selectedType, (newValue) => {
    if (newValue === 'searchStore') {
        router.push('/store-list');
    }
});

const updateKeywords = _debounce(async (value) => {
    keywords.value = value;
}, 300);

watch(inputValue, (newValue) => {
    updateKeywords(newValue);
});

onMounted(() => {
    getEvent(query.value);
});
</script>
<style></style>
