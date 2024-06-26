<template>
    <div
        id="scroll-section"
        v-in-view="{ once: true }"
        class="py-16 container in-view"
    >
        <TitlePanel
            class="ani-entrance ani-entrance-0"
            :tag="titleData.tag"
            :title="titleData.title"
            :desc="titleData.desc"
        ></TitlePanel>
        <div class="section">
            <div v-if="errorMessage.split()" class="text-center mt-4">
                <p>{{ errorMessage }}</p>
            </div>
            <div class="ani-entrance ani-entrance-2">
                <TitleCardList
                    v-if="data.length > 0"
                    :data="data"
                ></TitleCardList>
            </div>
        </div>
    </div>
</template>
<script setup>
import TitleCardList from '@/components/event/eventPanel.vue';
import { defineProps } from 'vue';
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
    tag: 'HOT',
    title: '推薦活動',
    desc: '無論做什麼選擇，不要讓自己遺憾！',
};
</script>
<style scoped>
.section {
    min-height: 600px;
}

.py-16 {
    padding: 64px 0;
}
</style>
