<template class="">
    <div class="bg-greyF7">
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
                        type="text"
                        class="form-control py-2"
                        value=""
                        required=""
                        placeholder="輸入關鍵字"
                    />
                </div>
            </div>
            <!-- 隱藏篩選按鈕 -->
            <div class="row pb-3 d-none">
                <div class="col d-flex gap-3">
                    <select
                        id="selectCity"
                        v-model="selectedCity"
                        class="form-select"
                        required
                    >
                        <option selected value="全部地點">全部地點</option>
                        <option
                            v-for="city in CityAll"
                            :key="city.CityName"
                            :value="city.CityName"
                        >
                            {{ city.CityName }}
                        </option>
                    </select>
                    <select id="selectCity" class="form-select" required="">
                        <option selected value="allState">全部狀態</option>
                        <option value="inviting">揪團中</option>
                        <option value="full">已成團</option>
                    </select>
                </div>
                <div class="col"></div>
            </div>
            <div class="row">
                <div
                    v-for="store in storeData"
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
import CityAll from '@/utilities/city';
import storeBgImage from '@/assets/images/brand_bg.png';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectType = ref('searchEvent');
const selectedCity = ref('全部地點');

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

onMounted(() => {
    getStore();
});
</script>
<style>
.card-title-h {
    height: 54px;
}
</style>
