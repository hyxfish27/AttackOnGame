<template>
    <div class="index-store-section">
        <div class="py-16 container">
            <TitlePanel
                :tag="titleData.tag"
                :title="titleData.title"
                :desc="titleData.desc"
            ></TitlePanel>
            <div
                v-if="errorMessage.split() && !loading"
                class="text-center mt-4"
            >
                <p>{{ errorMessage }}</p>
            </div>
            <div v-if="loading" class="text-center mt-4">
                <div class="spinner-border" role="status"></div>
            </div>
            <div v-if="!loading && storeData.length > 0" class="row">
                <StoreCard
                    v-for="data in storeData"
                    :key="data.user"
                    :data="data"
                    class="col-6 col-lg-3 mb-3"
                >
                </StoreCard>
            </div>
        </div>
    </div>
</template>
<script setup>
import EventAPI from '@/api/Event';
import { onMounted, ref } from 'vue';
import StoreCard from '@/components/store/storeCard.vue';
import TitlePanel from './titlePanel.vue';

const storeData = ref([]);
const loading = ref(true);
const errorMessage = ref('');
const titleData = {
    tag: 'BRAND',
    title: '推薦店家',
    desc: '在這裡，沒有什麼惡魔，都是天使主揪',
};

const getStore = async () => {
    loading.value = true;
    await EventAPI.getStores()
        .then((res) => {
            storeData.value = res.data.slice(0, 4);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            loading.value = false;
        });
};
onMounted(() => {
    getStore();
});
</script>
<style>
.index-store-section {
    background: linear-gradient(180deg, #ffffff 0%, #ffdd33 100%);
    .title-card-list {
        gap: 16px;
    }
    .py-16 {
        padding: 64px 0;
    }
}
</style>
