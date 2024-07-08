<template>
    <div class="container-xxl">
        <div class="row p-3">
            <Loading
                v-if="isLoading"
                :class="{ 'loading-fade': !isLoading }"
            ></Loading>
            <LeftEl></LeftEl>
            <div class="col-9 ps-3">
                <div class="border rounded bg-white h-100 p-3 min-h-screen">
                    <!-- <div>
                    <input
                        class="rounded form-control w-50"
                        type="text"
                        placeholder="快速搜尋"
                    />
                </div> -->
                    <div
                        class="d-grid mt-3 gap-2 align-items-center fw-bold border-bottom pb-2"
                        style="grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr"
                    >
                        <p>操作</p>
                        <p>名稱</p>

                        <p>活動舉辦日期</p>

                        <p class="text-center">狀態</p>
                        <p>報名人數 /<br />額滿狀態</p>
                        <p>活動報名<br />截止日期</p>
                    </div>
                    <div v-if="events.length > 0">
                        <div
                            v-for="event in events"
                            :key="event.idNumber"
                            style="
                                grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
                            "
                            class="py-2 d-grid gap-2 align-items-center border-bottom"
                        >
                            <div class="d-flex gap-2">
                                <router-link
                                    :to="{
                                        name: 'StoreActivity',
                                        params: { idNumber: event.idNumber },
                                    }"
                                    type="button"
                                    class="btn btn-primary py-1 px-2 d-flex"
                                >
                                    <span class="material-symbols-outlined">
                                        visibility
                                    </span>
                                </router-link>
                                <!-- TODO之後活動編輯好了再開放這顆按鈕 -->
                                <!-- <button type="button" class="btn btn-danger py-1 px-2">
                            <svg
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <title>pencil</title>
                                <path
                                    fill="#ffff"
                                    d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                                />
                            </svg>
                        </button> -->
                            </div>
                            <div>
                                {{ event.title }}
                            </div>
                            <div>
                                {{ event.eventStartTime }}
                            </div>
                            <div class="text-center">
                                {{
                                    stateText(
                                        event.currentParticipantsCount,
                                        event.maxParticipants,
                                        event.minParticipants
                                    )
                                }}
                            </div>
                            <div class="text-center">
                                {{ event.currentParticipantsCount }} /
                                {{ event.maxParticipants }}
                            </div>
                            <div>
                                {{ event.registrationEndTime }}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <EmptyField text="你還沒有創建活動唷"></EmptyField>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import LeftEl from '@/components/store/StoreLeftEl.vue';
import StoreAPI from '@/api/Store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Loading from '@/components/common/Loading.vue';
import EmptyField from '@/components/common/EmptyField.vue';

const events = ref([]);
const router = useRouter();
const isLoading = ref(true);

const stateText = (current, max, min) => {
    if (current === max) return '已成團';
    if (current < min) return '未成團';
    if (current > max) return '揪團中';
    return '其他';
};

const getEventAll = async () => {
    await StoreAPI.getMyEvent()
        .then((res) => {
            console.log('order', res);
            events.value = res.data.data;
            setTimeout(() => {
                isLoading.value = false;
            }, 500);
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
                alert('請先完成登入');
                router.push({
                    name: 'PlayerLogin',
                });
            } else {
                isLoading.value = false;
                console.log(err);
            }
        });
};
onMounted(() => {
    getEventAll();
});
</script>
<style>
body {
    background-color: #f7f7f7;
}
</style>
