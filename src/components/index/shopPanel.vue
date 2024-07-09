<template>
    <div
        v-in-view="{ once: true }"
        class="in-view container-fluid index-store-section"
    >
        <div class="index-store-section">
            <div
                class="dot-bg"
                style=""
                :style="{ backgroundImage: 'url(' + DotBg + ')' }"
            ></div>
            <div class="py-16 container">
                <TitlePanel
                    class="ani-entrance ani-entrance-0"
                    :tag="titleData.tag"
                    :title="titleData.title"
                    :desc="titleData.desc"
                ></TitlePanel>
                <div v-if="errorMessage.split()" class="text-center mt-4">
                    <p>{{ errorMessage }}</p>
                </div>
                <div v-if="data.length > 0" class="row">
                    <Swiper :data="data" class="ani-entrance ani-entrance-2">
                        <template #slideContent="{ slide }">
                            <StoreCard
                                :is-lazy-load="true"
                                :data="slide"
                                css-style="w-100"
                                @click="onStoreCardClick(slide.user)"
                            >
                                <!-- store.user -->
                            </StoreCard>
                        </template>
                    </Swiper>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import DotBg from '@/assets/images/dot_bg.svg';
import { defineProps } from 'vue';
import StoreCard from '@/components/store/storeCard.vue';
import { useRouter } from 'vue-router';
import vInView from '@/directives/observeInView';
import Swiper from '@/components/index/swiperPanel.vue';
import TitlePanel from './titlePanel.vue';

defineProps({
    errorMessage: {
        type: String,
        default: '',
    },
    data: {
        type: Array,
        default: () => [],
    },
});

const titleData = {
    tag: 'BRAND',
    title: '推薦店家',
    desc: '在這裡，沒有什麼惡魔，都是天使主揪',
};
const router = useRouter();
const onStoreCardClick = (userId) => {
    router.push({ name: 'StoreIntroduction', params: { userId } });
};
</script>
<style lang="scss" scoped>
.index-store-section {
    background: linear-gradient(180deg, #ffffff 30%, #ffdd33 100%);
    position: relative;

    .dot-bg {
        background-position: bottom;
        background-size: 3%;
        position: absolute;
        background-repeat: repeat-x;

        position: absolute;
        inset: -10px;
    }

    .title-card-list {
        gap: 16px;
    }

    .py-16 {
        padding: 64px 0;
    }
}
</style>
