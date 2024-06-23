<template>
    <div class="row">
        <EventCard v-for="event in data" :key="event.idNumber" :data="event" :keywords="keywords"
            @click="onEventCardClick(event.idNumber)"></EventCard>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import EventCard from './eventCard.vue';

const { data } = defineProps({
    data: {
        type: Array,
        default: () => [],
    },
    keywords: {
        type: String,
        default: '',
    },
});
const router = useRouter();
/**
 * onEventCardClick
 * @param {string} eventId  活動 id
 * @description  活動卡片點擊事件
 */
const onEventCardClick = (eventId) => {
    console.log('test01', eventId);
    router.push({ name: 'SingleEvent', params: { eventId } });
};
</script>
<style>
.card-title-h {
    height: 54px;
}
</style>
