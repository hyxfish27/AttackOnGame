<template>
    <div class="container-xxl">
        <div class="row p-3">
            <LeftEl></LeftEl>
            <div class="col-9 border rounded bg-white h-100 p-3 min-h-screen">
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

                    <p>活動日期</p>

                    <p class="text-center">狀態</p>
                    <p>報名人數 /<br />額滿狀態</p>
                    <p>截止日期</p>
                </div>
                <div v-if="events.length > 0">
                    <div
                        v-for="event in events"
                        :key="event.idNumber"
                        style="grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr"
                        class="py-2 d-grid gap-2 align-items-center border-bottom"
                    >
                        <div class="d-flex gap-2">
                            <router-link
                                :to="{
                                    name: 'StoreActivity',
                                    params: { idNumber: event.idNumber },
                                }"
                                type="button"
                                class="btn btn-primary py-1 px-2"
                            >
                                <svg
                                    width="16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <title>eye</title>
                                    <path
                                        fill="#ffff"
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
                                    />
                                </svg>
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
                <div v-else>您目前沒有活動</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import LeftEl from '@/components/store/StoreLeftEl.vue';
import StoreAPI from '@/api/Store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const events = ref([]);
const router = useRouter();
// const events = [
//     {
//         idNumber: 'f2gmybp8',
//         storeId: '666fb08dd0bb0dbef3fb6c40',
//         isFoodAllowed: true,
//         description:
//             '週末帶著孩子們來參加我們的親子桌遊下午茶活動吧！這次活動專為家庭設計，提供各種適合不同年齡段的桌遊，讓大人和孩子們都能享受其中。我們還會準備豐富的下午茶點心，讓您和家人在遊戲之餘也能享受到美食。歡迎各位家庭來參加，讓我們一起度過一個充滿歡笑和溫馨的下午吧！',
//         title: '👨‍👩‍👧‍👦親子桌遊下午茶，樂享親子時光！寵物可接受唷',
//         address: '台北市中山區南京東路三段65號',
//         eventStartTime: '2024-07-20 22:00',
//         eventEndTime: '2024-07-21 01:00',
//         registrationStartTime: '2024-05-05 08:00',
//         registrationEndTime: '2024-06-20 21:59',
//         maxParticipants: 4,
//         minParticipants: 2,
//         currentParticipantsCount: 4,
//         participationFee: 250,
//         eventImageUrl: [
//             'https://i.imgur.com/l3rD07m.jpeg',
//             'https://i.imgur.com/yZtxUKz.jpeg',
//         ],
//     },
//     {
//         idNumber: '3yu4jfvt',
//         storeId: '666fb08dd0bb0dbef3fb6c40',
//         isFoodAllowed: true,
//         description:
//             '夜貓子們，這場桌遊之夜就是為你們準備的！我們將提供一整晚的桌遊活動，讓你能夠在夜深人靜的時候盡情玩樂。我們會挑選一些耐玩的策略遊戲和充滿挑戰的卡牌遊戲，讓你和朋友們可以盡情挑戰和競賽。還會有一些夜宵供應，確保你們能夠保持精力。趕快報名，來體驗一場不一樣的桌遊之夜吧！',
//         title: '夜貓子桌遊之夜，不眠不休！🌙',
//         address: '台北市中山區南京東路三段65號',
//         eventStartTime: '2024-07-28 06:00',
//         eventEndTime: '2024-07-28 10:00',
//         registrationStartTime: '2024-06-10 08:00',
//         registrationEndTime: '2024-07-28 05:59',
//         maxParticipants: 6,
//         minParticipants: 2,
//         currentParticipantsCount: 6,
//         participationFee: 300,
//         eventImageUrl: ['https://i.imgur.com/zrkw8ae.jpeg'],
//     },
// ];

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
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
                alert('請先完成登入');
                router.push({
                    name: 'PlayerLogin',
                });
            } else {
                alert(`${err.response.data.message}`);
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
