<template>
    <div
        v-in-view="{ once: true }"
        class="index-store-section container-fluid in-view"
    >
        <div
            class="dot-bg"
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
                <StoreCard
                    v-for="store in data"
                    :key="store.user"
                    :data="store"
                    class="col-6 col-lg-3 mb-3 ani-entrance ani-entrance-2"
                    @click="onStoreCardClick(store.user)"
                >
                </StoreCard>
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
        inset: -1px;
    }

    .title-card-list {
        gap: 16px;
    }

    .py-16 {
        padding: 64px 0;
    }
}
</style>
