<template>
    <div style="background-color: #ffff" :class="{ fixed: !isContentDisplay }">
        <Loading
            v-if="isLoading && isContentDisplay"
            :class="{ 'loading-fade': !isLoading }"
        ></Loading>
        <div
            class="full-screen-without-footer d-flex align-items-center bg-yellow-light banner-bg-style align-items-center justify-content-center"
            :style="{
                backgroundImage: 'url(' + bennerBg + ')',
            }"
        >
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div
                            class="d-flex justify-content-center align-items-center py-3"
                        >
                            <img
                                class="w-70"
                                :src="bennerImg"
                                alt="Banner圖片 聚局的聚人"
                            />
                            <button
                                type="button"
                                class="btn btn-dark d-flex justify-content-center flex-column align-items-center bg-black position-absolute border-white border border-2 rounded-circle gap-1 pt-2 shadow-sm mt-15 banner-btn"
                                @click.prevent="clickScrollBtn"
                            >
                                <p class="fw-semibold text-warning cursor">
                                    SCROLL
                                </p>
                                <svg
                                    style="width: 24px"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <title>arrow-down</title>
                                    <path
                                        fill="#FFDD33"
                                        d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isContentDisplay" :ref="otherContent">
            <EventPanel
                :error-message="errorMessage"
                :data="eventData"
            ></EventPanel>
            <ShopPanel
                :error-message="errorMessage"
                :data="storeData"
            ></ShopPanel>
            <div class="container">
                <div
                    class="row"
                    :style="{ backgroundImage: 'url(' + logoWatermark + ')' }"
                    style="
                        background-position: center 50px;
                        background-size: contain;
                        background-repeat: no-repeat;
                    "
                >
                    <div v-in-view="{ once: true }" class="col in-view">
                        <div
                            class="py-10 text-center fs-4 noto-serif-tc fw-bold lh-lg ani-entrance ani-entrance-0"
                        >
                            <p>不論你要找什麼樣的桌遊團？</p>
                            <p>這裡都有你的容身之處</p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="bg-warning dot-bg"
                :style="{ backgroundImage: 'url(' + DotBg + ')' }"
            >
                <div></div>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div
                                style="margin-top: -80px"
                                :style="{
                                    backgroundImage:
                                        'url(' + ctaMessageBg + ')',
                                }"
                                class="p-3 d-flex justify-content-center"
                            >
                                <img class="w-90" :src="ctaMessageImg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="row py-3">
                        <div
                            class="col p-4 d-flex justify-content-center align-items-center flex-column gap-4"
                        >
                            <img
                                class="w-70 mx-auto"
                                :src="ctaTextImg"
                                alt=""
                            />
                            <div v-in-view="{ once: true }" class="in-view">
                                <router-link
                                    :to="{ name: 'EventList' }"
                                    type="button"
                                    class="ani-entrance ani-entrance-0 find-btn d-flex align-items-center fs-6 fw-bold py-3 px-4 noto-serif-tc btn btn-primary border border-black d-inline-block border-2"
                                >
                                    <p class="pe-2">
                                        沙沙給油！找出屬於你的桌遊兵團！
                                    </p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="32"
                                    >
                                        <title>chevron-right</title>
                                        <path
                                            fill="#ffff"
                                            d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                                        />
                                    </svg>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UserAccessPanel></UserAccessPanel>
        </div>
    </div>
</template>

<script setup>
import DotBg from '@/assets/images/dot_bg_2.svg';
import bennerBg from '@/assets/images/index_banner_bg_pc.png';
import bennerImg from '@/assets/images/index_banner_img.png';
import logoWatermark from '@/assets/images/index_logo_watermark.jpeg';
import ctaMessageBg from '@/assets/images/index_cta_message_bg.jpeg';
import ctaMessageImg from '@/assets/images/index_cta_message_image_pc.png';
import ctaTextImg from '@/assets/images/index_cta_text_img.svg';
import EventPanel from '@/components/index/eventPanel.vue';
import ShopPanel from '@/components/index/shopPanel.vue';
import UserAccessPanel from '@/components/index/UserAccessPanel.vue';
import { onMounted, ref, nextTick } from 'vue';
import EventAPI from '@/api/Event';
import vInView from '@/directives/observeInView';
import Loading from '@/components/common/Loading.vue';

const storeData = ref([]);
const eventData = ref([]);
const isLoading = ref(true);
const errorMessage = ref('');
const isContentDisplay = ref(false);
const sectionIsFixed = ref(true);
const clickScrollBtn = () => {
    sectionIsFixed.value = false;
    isContentDisplay.value = true;
    nextTick(() => {
        const nextSection = document.getElementById('scroll-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
};
const loadData = async () => {
    isLoading.value = true;
    errorMessage.value = '';

    const eventsPromise = EventAPI.getEvents({
        limit: 12,
        registrationStatus: 2,
    });
    const storesPromise = EventAPI.getStores();

    try {
        const [eventsResponse, storesResponse] = await Promise.all([
            eventsPromise,
            storesPromise,
        ]);

        eventData.value = eventsResponse.data;
        storeData.value = storesResponse.data;
    } catch (err) {
        eventData.value = [];
        storeData.value = [];
        errorMessage.value =
            err?.data?.message || '連線逾時，靜待雲端伺服器睡醒';
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 500);
    }
};

onMounted(() => {
    loadData();
});
</script>

<style lang="scss" scoped>
.banner-bg-style {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.fixed {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
}

.banner-btn {
    width: 100px;
    height: 100px;
    margin-left: 36px;
}

.banner-btn:hover {
    background-color: #333333 !important;
}

.find-btn {
    box-shadow: 12px 12px 0px 0px #333333;
}

.dot-bg {
    // background-position: bottom;
    background-size: 3%;
    // position: absolute;
    background-repeat: repeat-x;
    inset: -1px;
}
</style>
