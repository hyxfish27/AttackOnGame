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
                <div class="">
                    <button
                        type="submit"
                        class="btn btn-primary mb-2"
                        @click="changeSortBy"
                    >
                        排序按照： {{ sortBy.text }}
                    </button>
                </div>
            </div>
            <div v-if="loading" class="text-center mt-4">
                <div class="spinner-border" role="status"></div>
            </div>
            <div v-if="errorMessage.split()" class="text-center mt-4">
                <p>{{ errorMessage }}</p>
            </div>
            <div v-if="rawEventData.length > 0">
                <EventPanel
                    class="mt-4"
                    :data="rawEventData"
                    :keywords="keywords"
                ></EventPanel>
            </div>
        </div>
    </div>
</template>
<script setup>
import EventAPI from '@/api/Event';
// import CityAll from '@/utilities/city';
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import _debounce from 'lodash/debounce';
import EventPanel from '../components/event/eventPanel.vue';
import { SORT_BY, SORT_ORDER } from '../constant/eventList';

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
const sortByKeys = Object.keys(SORT_BY_MAP);
const sortBy = ref(SORT_BY_MAP[SORT_BY]);

function changeSortBy() {
    const currentIndex = sortByKeys.indexOf(sortBy.value.value);
    const nextIndex = (currentIndex + 1) % sortByKeys.length;
    sortBy.value = SORT_BY_MAP[sortByKeys[nextIndex]];
}
const sortOrder = ref(SORT_ORDER);
const loading = ref(true);
const errorMessage = ref('');
const inputValue = ref('');
const keywords = ref('');
const router = useRouter();
const selectedType = ref('searchEvent');
const selectedStatus = ref(0);
const rawEventData = ref([]);

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

const query = computed(() => ({
    formationStatus: selectedStatus.value,
    registrationStatus: registrationStatus.value,
    sortBy: sortBy.value.value,
    sortOrder: sortOrder.value,
    keyword: keywords.value,
}));

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
