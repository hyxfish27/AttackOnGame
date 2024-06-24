<template>
    <div
        class="col-3 p-3 border rounded bg-white flex-grow-1 shadow"
        style="min-height: 80vh"
    >
        <div>
            <p class="fs-8 fw-bold text-grey66">店家帳戶資訊</p>
            <!-- <img class="player-admin__img" :url="formData.url" /> -->
            <div
                style="width: 130px; height: 130px"
                class="border-5 border border-warning rounded-circle p-4 mx-auto mt-5 mb-2"
            >
                <img
                    class="w-100"
                    src="/src/assets/images/user-icon.png"
                    alt="店家圖片"
                />
            </div>

            <!-- <div>{{ formData.email }}</div> -->
            <div class="mb-4 text-center fw-bold">
                {{ indexStore.playerData.name }}
            </div>

            <div class="d-flex flex-column gap-2">
                <button
                    type="button"
                    class="p-2 btn w-100"
                    @click="goPlayerPage"
                >
                    我的帳戶
                </button>
                <!-- <div>平台幣</div> -->
                <button
                    type="button"
                    class="p-2 btn w-100 m-0"
                    @click="goActivityPage"
                >
                    我的活動
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import useIndexStore from '@/stores/index';

const router = useRouter();
const indexStore = useIndexStore();
const goPlayerPage = () => {
    router.push({
        name: 'SroreAdminId',
    });
};
const goActivityPage = () => {
    router.push({
        name: 'PlayerActivity',
    });
};
</script>

<style scoped>
.shadow {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
