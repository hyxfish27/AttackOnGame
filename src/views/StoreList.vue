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
                <div
                    v-for="store in filteredStore"
                    :key="store.user"
                    class="col-6 col-lg-3 mb-3"
                >
                    <div
                        :style="{
                            background: 'url(' + storeBgImage + ')',
                            backgroundSize: '100% 100%',
                            paddingTop: '182%',
                        }"
                        class="position-relative"
                    >
                        <div
                            class="position-absolute inset-0 d-flex justify-content-center align-items-center flex-column px-4 pb-4 noto-serif-tc gap-2 w-100"
                        >
                            <img
                                width="50%"
                                height="23%"
                                class="rounded-circle object-fit-cover mb-2 border"
                                :src="store.avatar"
                                :alt="store.name"
                            />

                            <p
                                class="fw-bold fs-8"
                                style="height: 27px; overflow: hidden"
                            >
                                {{ store.name }}
                            </p>
                            <p class="fs-10 text-grey66">{{ store.address }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import EventAPI from '@/api/Event';
import storeBgImage from '@/assets/images/brand_bg.png';
import { onMounted, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import _debounce from 'lodash/debounce';

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
.card-title-h {
    height: 54px;
}
.store-list-wrap {
    min-height: calc(100vh - 312px);
}
</style>
