<template>
    <div :class="cssStyle">
        <div
            :style="{
                '--bgImg': 'url(' + storeBgImage + ')',
                '--bgHover': 'url(' + storeBgHover + ')',
            }"
            class="position-relative card-wrap"
        >
            <div
                class="position-absolute inset-0 d-flex justify-content-center align-items-center flex-column px-4 pb-4 noto-serif-tc gap-2 w-100"
            >
                <img
                    referrerpolicy="no-referrer"
                    width="50%"
                    height="23%"
                    class="rounded-circle object-fit-cover mb-2 border"
                    :src="storeImg"
                    :alt="data.name"
                    loading="lazy"
                    @error="handleErrorImage()"
                />
                <div
                    v-if="isLazyLoad"
                    class="swiper-lazy-preloader swiper-lazy-preloader-black"
                ></div>
                <p
                    class="fw-bold fs-8 line-clamp line-clamp-1"
                    style="height: 27px; overflow: hidden"
                >
                    {{ data.name }}
                </p>
                <div class="d-flex align-items-center noto-serif-tc gap-1">
                    <span class="material-symbols-outlined fs-8">
                        location_on
                    </span>
                    <p class="fs-10 text-grey66">{{ data.address }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import storeBgImage from '@/assets/images/brand_bg.png';
import storeBgHover from '@/assets/images/brand_bg_hover.png';
import storeDefaultIcon from '@/assets/images/brand_icon.png';
import _isEmpty from 'lodash/isEmpty';

const { data } = defineProps({
    isLazyLoad: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object,
        default: () => ({}),
    },
    cssStyle: {
        type: String,
        default: 'col-6 col-lg-3 mb-3',
    },
});
const storeImg = computed(() => {
    if (_isEmpty(data.avatar)) return storeDefaultIcon;
    return data.avatar;
});
function handleErrorImage(e) {
    e.src = storeDefaultIcon;
}
</script>
<style lang="scss" scoped>
.card-title-h {
    height: 54px;
}
.card-wrap {
    background-image: var(--bgImg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 550px;
    transition: background-image 0.5s ease-in-out;
}
.card-wrap:hover {
    background-image: var(--bgHover);
}
</style>
