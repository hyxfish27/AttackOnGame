<template>
    <div class="py-16 container">
        <TitlePanel
            :tag="titleData.tag"
            :title="titleData.title"
            :desc="titleData.desc"
        ></TitlePanel>
        <div v-if="errorMessage.split() && !loading" class="text-center mt-4">
            <p>{{ errorMessage }}</p>
        </div>
        <div v-if="loading" class="text-center mt-4">
            <div class="spinner-border" role="status"></div>
        </div>
        <div class="d-flex">
            <TitleCardList
                v-if="!loading && eventData.length > 0"
                :data="eventData"
            ></TitleCardList>
        </div>
    </div>
</template>
<script setup>
import TitleCardList from '@/components/event/eventPanel.vue';
import EventAPI from '@/api/Event';
import { onMounted, ref } from 'vue';
import TitlePanel from './titlePanel.vue';

const eventData = ref([]);
const loading = ref(true);
const errorMessage = ref('');
const titleData = {
    tag: 'HOT',
    title: '推薦活動',
    desc: '無論做什麼選擇，不要讓自己遺憾！',
};
const getEvent = async (query = {}) => {
    loading.value = true;
    errorMessage.value = '';
    await EventAPI.getEvents(query)
        .then((res) => {
            eventData.value = res.data;
        })
        .catch((err) => {
            console.log('xxx', err);
            eventData.value = [];
            errorMessage.value =
                err?.data?.message || '連線逾時，靜待雲端伺服器睡醒';
        })
        .finally(() => {
            loading.value = false;
        });
};
onMounted(() => {
    getEvent({ limit: 4, registrationStatus: 2 });
});
</script>
<style>
/* .title-card-list {
    gap: 16px;
} */
.py-16 {
    padding: 64px 0;
}
</style>
