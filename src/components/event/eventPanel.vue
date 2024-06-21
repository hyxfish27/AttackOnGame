<template>
    <div class="row mt-4">
        <EventCard
            v-for="event in data"
            :key="event._id"
            :data="event"
            :keywords="keywords"
        ></EventCard>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
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
</script>
<style>
.card-title-h {
    height: 54px;
}
</style>
