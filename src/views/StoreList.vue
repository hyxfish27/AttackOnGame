<template class="">
    <div class="bg-greyF7 store-list-wrap">
        <div class="container pb-5">
            <div class="row py-7 justify-content-center">
                <div
                    class="col-7 d-flex gap-2 border-bottom border-primary py-3 px-0 noto-serif-tc"
                >
                    <select
                        id="selectCity"
                        v-model="selectType"
                        class="form-select w-25 bg-greyF7 border-0 fw-bold text-primary"
                        required=""
                    >
                        <option value="searchEvent">尋找活動</option>
                        <option selected value="searchStore">尋找店家</option>
                    </select>
                    <input
                        id="validationCustom01"
                        v-model="inputValue"
                        type="text"
                        class="form-control py-2"
                        required=""
                        placeholder="輸入關鍵字"
                    />
                </div>
            </div>
            <div class="row">
                <StoreCard
                    v-for="data in filteredStore"
                    :key="data.user"
                    :data="data"
                    class="col-6 col-lg-3 mb-3"
                ></StoreCard>
            </div>
        </div>
    </div>
</template>
<script setup>
import EventAPI from '@/api/Event';
import { onMounted, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import _debounce from 'lodash/debounce';
import StoreCard from '@/components/store/storeCard.vue';

const router = useRouter();
const selectType = ref('searchStore');

const storeData = ref(null);
const getStore = async () => {
    await EventAPI.getStores()
        .then((res) => {
            storeData.value = res.data;

            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};
watch(selectType, (newValue) => {
    if (newValue === 'searchEvent') {
        router.push('/event-list');
    }
});
const inputValue = ref('');
const keywords = ref('');
const updateKeywords = _debounce(async (value) => {
    keywords.value = value;
}, 300);

watch(inputValue, (newValue) => {
    console.log(newValue);
    updateKeywords(newValue);
});
const filteredStore = computed(() => {
    if (keywords.value.trim()) {
        return storeData.value.filter((x) => x.name.includes(keywords.value));
    }
    return storeData.value;
});
onMounted(() => {
    getStore();
});
</script>
<style>
.store-list-wrap {
    min-height: calc(100vh - 312px);
}
</style>
