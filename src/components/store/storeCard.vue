<template>
    <div class="col-6 col-lg-3 mb-3">
        <div :style="{
            background: 'url(' + storeBgImage + ')',
            backgroundSize: '100% 100%',
            paddingTop: '182%',
        }" class="position-relative">
            <div
                class="position-absolute inset-0 d-flex justify-content-center align-items-center flex-column px-4 pb-4 noto-serif-tc gap-2 w-100">
                <img referrerpolicy="no-referrer" width="50%" height="23%"
                    class="rounded-circle object-fit-cover mb-2 border" :src="data.avatar" :alt="data.name" />

                <p class="fw-bold fs-8 line-clamp line-clamp-1" style="height: 27px; overflow: hidden">
                    {{ data.name }}
                </p>
                <p class="fs-10 text-grey66">{{ data.address }}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import storeBgImage from '@/assets/images/brand_bg.png';

defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});
</script>
<style>
.card-title-h {
    height: 54px;
}
</style>
