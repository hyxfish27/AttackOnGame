<template>
    <div class="p-3 border rounded bg-white">
        <div>
            <p class="fs-8 fw-bold text-grey66">玩家帳戶資訊</p>
            <!-- <img class="player-admin__img" :url="formData.url" /> -->
            <div v-if="isImg" style="width: 130px; height: 130px"
                class="img-wrap border-5 border border-warning rounded-circle mx-auto mt-5 mb-2">
                <img referrerpolicy="no-referrer" class="avatar" :src="indexStore.playerData.avatar" alt="玩家圖片" />
            </div>
            <div v-else style="width: 130px; height: 130px"
                class="border-5 border border-warning rounded-circle p-4 mx-auto mt-5 mb-2">
                <img class="w-100" :src="defaultPic" alt="玩家圖片" />
            </div>
            <!-- <div>{{ formData.email }}</div> -->
            <div class="mb-4 text-center fw-bold">
                {{ indexStore.playerData.name }}
            </div>

            <div class="d-flex flex-column gap-2">
                <button type="button" class="p-2 btn w-100 side-list" @click="goPlayerPage">
                    我的帳戶
                </button>
                <!-- <div>平台幣</div> -->
                <button type="button" class="p-2 btn w-100 m-0 side-list" @click="goActivityPage">
                    我的活動
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useIndexStore from '@/stores/index';
import defaultPic from '@/assets/images/user-icon.png';

const router = useRouter();
const indexStore = useIndexStore();
const goPlayerPage = () => {
    console.log(indexStore.playerData);
    router.push({
        name: 'PlayerAdminId',
        params: { id: indexStore.playerData.user },
    });
};
const goActivityPage = () => {
    router.push({
        name: 'PlayerActivity',
    });
};

const isImg = computed(() => {
    if (indexStore.playerData.avatar === 'https://example.com/avatar.jpg') {
        return false;
    }
    return !!indexStore.playerData.avatar;
});
</script>
<style lang="scss" scoped>
.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.img-wrap {
    overflow: hidden;
}

.side-list:hover {
    background-color: #eeecec;
}
</style>
