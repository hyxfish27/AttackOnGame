<template>
    <div class="col-3 ps-0">
        <div class="border rounded bg-white h-100 min-h-screen">
            <p class="fs-8 fw-bold text-grey66 p-3">店家帳戶資訊</p>
            <!-- <img class="player-admin__img" :url="formData.url" /> -->
            <div
                style="width: 130px; height: 130px; border: 5px solid #ff8025"
                class="border-5 rounded-circle p-4 mx-auto mt-5 mb-2"
            >
                <img
                    referrerpolicy="no-referrer"
                    class="w-100"
                    src="/src/assets/images/store-icon.png"
                    alt="玩家圖片"
                />
            </div>

            <!-- <div>{{ formData.email }}</div> -->
            <div class="mb-4 text-center fw-bold">
                <!-- {{ indexStore.playerData.name }} -->
            </div>

            <div class="d-flex flex-column gap-2">
                <router-link
                    :to="{ name: 'StoreAdminId' }"
                    type="button"
                    class="p-2 btn w-100 border-0"
                    >店家資料</router-link
                >

                <router-link
                    :to="{ name: 'StoreActivityList' }"
                    type="button"
                    class="p-2 btn w-100 m-0 border-0"
                >
                    管理活動
                </router-link>
                <router-link
                    :to="{ name: 'StoreActivityEdit' }"
                    type="button"
                    class="p-2 btn w-100 m-0 border-0"
                >
                    創建活動
                </router-link>
            </div>
        </div>
    </div>
</template>
<script setup>
// import { useRouter } from 'vue-router';
// import useIndexStore from '@/stores/index';

// const router = useRouter();
// const indexStore = useIndexStore();
// const goUserPage = () => {
//   console.log(indexStore.playerData);
//   router.push({
//     name: 'PlayerAdminId',
//     params: { id: indexStore.playerData.user },
//   });
// };
// const goActivityPage = () => {
//   router.push({
//     name: 'PlayerActivity',
//   });
// };
</script>
