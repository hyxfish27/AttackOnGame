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
                        <option selected value="searchEvent">尋找活動</option>
                        <option value="searchStore">尋找店家</option>
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
            <div v-if="selectType === 'searchEvent'" class="row">
                <div
                    v-for="event in eventData"
                    :key="event._id"
                    class="col-6 col-lg-3 mb-3"
                >
                    <div class="card h-100 p-2">
                        <div class="position-relative pt-150per">
                            <p
                                class="py-1 px-2 bg-warning z-1 position-absolute top-0 fs-10 noto-serif-tc"
                            >
                                揪團中
                            </p>
                            <img
                                ref="image"
                                class="w-100 h-100 inset-0 object-fit-cover position-absolute"
                                :src="event.eventImageUrl[0]"
                                :alt="event.title"
                            />
                        </div>

                        <div class="card-body p-2">
                            <p class="fs-10 text-grey9F">
                                {{ event.eventStartTime }}
                            </p>
                            <p
                                class="card-title noto-serif-tc fw-bold fs-8 mb-0 overflow-hidden card-title-h"
                            >
                                {{ event.title }}
                            </p>
                            <p class="card-text text-end text-grey66">
                                {{ event.currentParticipantsCount }} /
                                {{ event.maxParticipants }}
                                <span class="noto-serif-tc">人</span>
                            </p>
                            <div
                                style=""
                                class="bg-greyE9 rounded-1 pb-2 mb-2 position-relative"
                            >
                                <div
                                    class="position-absolute h-100 start-0 bg-blue-light rounded-4"
                                    :style="{
                                        right: lineStyle(
                                            event.currentParticipantsCount,
                                            event.maxParticipants
                                        ),
                                    }"
                                ></div>
                            </div>
                            <p class="fs-6 fw-bold text-primary mb-1">
                                NT$ {{ event.participationFee }}
                            </p>
                            <div
                                class="d-flex text-grey66 align-items-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <title>map-marker-radius</title>
                                    <path
                                        fill="#666666"
                                        d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z"
                                    />
                                </svg>

                                <p class="noto-serif-tc fs-10 letter-spacing-1">
                                    {{ addressFristText(event.address) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row">
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

const selectType = ref('searchEvent');
const selectedCity = ref('全部地點');
const eventData = ref(null);
const getEvent = async () => {
    await EventAPI.getEvents()
        .then((res) => {
            eventData.value = res.data;

            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};
const addressFristText = (text) => {
    return text.slice(0, 6);
};
const lineStyle = (currentNum, maxNum) => {
    if (maxNum === 0) {
        return '0%';
    }
    const percentage = (currentNum / maxNum) * 100;
    return `${100 - percentage}%`;
};

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
    if (newValue === 'searchStore' && storeData.value === null) {
        getStore();
    }
});

onMounted(() => {
    getEvent();
});
</script>
<style>
.card-title-h {
    height: 54px;
}
</style>
