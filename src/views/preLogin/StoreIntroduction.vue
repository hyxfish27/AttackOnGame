<template>
    <div class="store-introduction container-fluid">
        <div class="container pt-2">
            <div class="row">
                <div class="col-12">
                    <div
                        class="store-introduction__banner rounded-4 mb-4 bg-white border border-2 border-greyE9"
                    >
                        <div
                            class="banner__background rounded-top-4"
                            :style="{ height: '300px' }"
                        >
                            <img
                                class="w-100 inset-0 object-fit-cover rounded-top-4"
                                height="300px"
                                :src="storeViewObject.avatar"
                            />
                        </div>
                        <div class="banner__content row p-4">
                            <div class="col-3 col-lg-2">
                                <img
                                    width="160px"
                                    height="160px"
                                    class="rounded-circle object-fit-cover mb-2 border"
                                    :src="storeViewObject.avatar"
                                    :alt="storeViewObject.name"
                                />
                            </div>

                            <div class="col-9 col-lg-10">
                                <div
                                    class="row justify-content-between align-items-top"
                                >
                                    <div class="col-6 col-lg-8">
                                        <h6
                                            class="pb-3"
                                            :style="{
                                                borderBottom:
                                                    '1px dashed #c9c9c9',
                                            }"
                                        >
                                            {{ storeViewObject.name }}
                                        </h6>
                                        <p class="mb-2">
                                            {{ storeViewObject.address }}
                                        </p>
                                        <p class="mb-2">
                                            {{ storeViewObject.introduce }}
                                        </p>
                                    </div>
                                    <div class="col-3 col-lg-2">
                                        <button class="btn btn-primary">
                                            與我們聊聊
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="store-introduction__rating">
                        <h6
                            class="text-primary fw-bold pb-2 border-bottom border-2 border-primary"
                        >
                            店家評價
                        </h6>
                    </div>
                    <div class="store-introduction__content">
                        <h6
                            class="text-primary fw-bold pb-2 border-bottom border-2 border-primary"
                        >
                            其他活動
                        </h6>
                        <EventPanel
                            :data="eventCards"
                            :keywords="keywords"
                        ></EventPanel>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import EventAPI from '@/api/Event';
// import StoreAPI from '@/api/Store';

import EventPanel from '@/components/event/eventPanel.vue';

const route = useRoute();

const userId = ref(null);
const keywords = ref('');
const mockStoreViewObject = {
    _id: '666fb0f6d0bb0dbef3fb6c47',
    name: 'PartyTime 派對時光 | 桌遊市府店 | 深夜時段營業中，歡迎傳訊訂位',
    user: '666fb046d0bb0dbef3fb6c25',
    avatar: 'https://i.imgur.com/NgszI7b.jpeg',
    introduce:
        '桌遊咖啡館提供了一個舒適的環境，讓桌遊愛好者能夠一邊享受美味的咖啡，一邊享受各種桌遊的樂趣。無論是想與朋友一起挑戰複雜的策略遊戲，還是簡單的卡牌遊戲，這裡都能滿足您的需求。此外，店內的員工非常友好且樂於助人，隨時為您提供遊戲的指導和建議。',
    address: '台北市大安區敦化南路一段245號',
    phone: '02-1234-5678',
    __v: 0,
};

// const mockEventCards = [
//     {
//         idNumber: 'jvwuz66b',
//         storeId: '666fb078d0bb0dbef3fb6c37',
//         isFoodAllowed: true,
//         description:
//             '大家好，管他期末考考幾分！！決定來場桌遊狂歡，趕快加入吧！不管你是高手還是新手，大家一起開心玩遊戲、放鬆心情。帶上你的朋友們，現在就來嗨吧！😆',
//         title: '大學生桌遊狂歡，期末考完就來！保證新手教學，不限低消🎲',
//         address: '桃園市中壢區中山路45號',
//         eventStartTime: '2024-06-21 04:00',
//         eventEndTime: '2024-06-21 07:00',
//         registrationStartTime: '2024-06-14 08:00',
//         registrationEndTime: '2024-06-21 03:59',
//         maxParticipants: 10,
//         minParticipants: 2,
//         currentParticipantsCount: 4,
//         participationFee: 150,
//         eventImageUrl: [
//             'https://i.ibb.co/59PNh07/IMG-10330745shikun1011-TP-V.jpg',
//         ],
//     },
//     {
//         idNumber: 'm7sds2vb',
//         storeId: '666fb05cd0bb0dbef3fb6c2e',
//         isFoodAllowed: true,
//         description:
//             '單身的你，快來參加我們的單身聯誼桌遊派對吧！甜蜜的桌遊時光，浪漫的邂逅，還有更多驚喜等著你🎲💕。一起遊玩、一起心動，愛情就在這裡萌芽🌟。',
//         title: '單身聯誼桌遊派對，想要認識另外一半的不要害羞欸！愛就在這裡💖',
//         address: '新北市板橋區文化路二段22號',
//         eventStartTime: '2024-06-23 02:00',
//         eventEndTime: '2024-06-23 06:00',
//         registrationStartTime: '2024-06-01 08:00',
//         registrationEndTime: '2024-06-22 07:59',
//         maxParticipants: 15,
//         minParticipants: 5,
//         currentParticipantsCount: 4,
//         participationFee: 1000,
//         eventImageUrl: [
//             'https://i.ibb.co/mvSDTSG/party-PAUI1710-TP-V.jpg',
//             'https://i.ibb.co/5kMt3jR/party-PAUI2142-TP-V.jpg',
//         ],
//     },
//     {
//         idNumber: 'hobiysd0',
//         storeId: '666fb087d0bb0dbef3fb6c3d',
//         isFoodAllowed: true,
//         description:
//             '各位辛苦的上班族們！工作了一天，是時候來放鬆一下了。我們準備了一場下班後的桌遊聚會，邀請大家一起來玩桌遊、聊天、釋放壓力。不論你是桌遊高手還是新手，都歡迎來參加，讓我們一起度過一個輕鬆愉快的晚上吧！😊',
//         title: '下班後桌遊聚會，來放鬆一下！🎲',
//         address: '台北市大同區民權西路14號',
//         eventStartTime: '2024-06-29 03:00',
//         eventEndTime: '2024-06-29 06:00',
//         registrationStartTime: '2024-06-20 08:00',
//         registrationEndTime: '2024-06-29 02:59',
//         maxParticipants: 6,
//         minParticipants: 3,
//         currentParticipantsCount: 0,
//         participationFee: 150,
//         eventImageUrl: [
//             'https://i.ibb.co/7Jj6mxt/DALL-E-2024-06-01-06-59-49-A-wide-screen-ratio-image-of-an-Asian-woman-holding-a-board-game-She-is-s.png',
//         ],
//     },
//     {
//         idNumber: 'lb6wmkd2',
//         storeId: '666fb064d0bb0dbef3fb6c31',
//         isFoodAllowed: true,
//         description:
//             '來加入我們的刺激陣營桌遊派對！展現你的策略與智慧，挑戰對手，成為最強陣營領袖。快來體驗緊張刺激的桌遊對決！',
//         title: '刺激陣營桌遊派對，來挑戰最有話題的狼人殺之夜吧！',
//         address: '台南市東區勝利路30號',
//         eventStartTime: '2024-06-30 00:00',
//         eventEndTime: '2024-06-30 04:00',
//         registrationStartTime: '2024-06-10 08:00',
//         registrationEndTime: '2024-06-29 07:59',
//         maxParticipants: 10,
//         minParticipants: 8,
//         currentParticipantsCount: 6,
//         participationFee: 199,
//         eventImageUrl: [
//             'https://i.ibb.co/nD51K0L/ookawa1224-IMGL1752-TP-V.jpg',
//             'https://i.ibb.co/MpSWcMW/ookawa-IMGL1665-TP-V.jpg',
//             'https://i.ibb.co/k5Pr9ps/ookawajenga-IMGL1676-TP-V.jpg',
//         ],
//     },
//     {
//         idNumber: 'eygsixlp',
//         storeId: '666fb080d0bb0dbef3fb6c3a',
//         isFoodAllowed: true,
//         description:
//             '嗨，單身的朋友們！想要認識新朋友，甚至找到另一半嗎？來參加我們的單身聯誼桌遊夜吧！這是一個輕鬆愉快的場合，你可以通過玩桌遊來結交新朋友，甚至可能找到心儀的對象哦！🎲',
//         title: '單身聯誼桌遊夜，找到你的另一半！💖',
//         address: '新竹市東區光復路一段88號',
//         eventStartTime: '2024-07-01 02:00',
//         eventEndTime: '2024-07-01 05:00',
//         registrationStartTime: '2024-06-25 08:00',
//         registrationEndTime: '2024-07-01 01:59',
//         maxParticipants: 5,
//         minParticipants: 4,
//         currentParticipantsCount: 0,
//         participationFee: 200,
//         eventImageUrl: [
//             'https://telegraph-image-2b5.pages.dev/file/8b45d37d364381b8c1218.png',
//         ],
//     },
//     {
//         idNumber: '7u5xdkmi',
//         storeId: '666fb04ed0bb0dbef3fb6c28',
//         isFoodAllowed: true,
//         description:
//             '準備好迎接撲克牌的瘋狂挑戰了嗎？快來參加我們的週六撲克牌瘋狂大戰吧！不管你是撲克牌小白還是老手，都能在這裡找到無限的樂趣和挑戰。我們準備了豐富的獎品，還有免費的零食和飲料等你來享用。帶上你的好運和牌技，來這裡和小夥伴們一起玩得開心、贏得精彩！',
//         title: '週六撲克牌瘋狂大戰',
//         address: '台中市西屯區中港路二段185號',
//         eventStartTime: '2024-07-01 18:00',
//         eventEndTime: '2024-07-02 02:00',
//         registrationStartTime: '2024-05-30 08:00',
//         registrationEndTime: '2024-07-01 07:59',
//         maxParticipants: 8,
//         minParticipants: 3,
//         currentParticipantsCount: 4,
//         participationFee: 250,
//         eventImageUrl: ['https://i.ibb.co/gtmkKhQ/yudai-9s50005-TP-V.jpg'],
//     },
//     {
//         idNumber: 'dzt6qpox',
//         storeId: '666fb06cd0bb0dbef3fb6c34',
//         isFoodAllowed: true,
//         description:
//             '親愛的媽媽們，快帶孩子來參加我們的刺激桌遊派對吧！這裡有適合6-10歲小朋友的有趣遊戲，孩子們將在快樂中學習與成長。快來讓孩子們度過一個難忘的下午吧！',
//         title: '6-10歲孩子的智力開發類型桌遊，親子同樂派對歡迎',
//         address: '台北市信義區松壽路12號',
//         eventStartTime: '2024-07-05 22:00',
//         eventEndTime: '2024-07-06 01:00',
//         registrationStartTime: '2024-06-15 08:00',
//         registrationEndTime: '2024-07-05 07:59',
//         maxParticipants: 5,
//         minParticipants: 5,
//         currentParticipantsCount: 0,
//         participationFee: 300,
//         eventImageUrl: [
//             'https://i.ibb.co/wStbk34/aomidori-IMGL1213-TP-V.jpg',
//             'https://i.ibb.co/ZXCcv9x/aomidori-IMGL1216-TP-V.jpg',
//         ],
//     },
// ];

const storeViewObject = ref({
    id: '',
    name: '',
    user: '',
    avatar: '',
    introduce: '',
    address: '',
    phone: '',
});

const eventCards = ref([]);

onMounted(() => {
    userId.value = route.params.userId;

    storeViewObject.value = mockStoreViewObject;

    // eventCards.value = mockEventCards;

    // 取得店家資料

    // 取得評價資料

    // 取得該店家的活動資料

    // StoreAPI.getStore(userId.value).then((response) => {
    //     console.log('apiiii', response);
    //     storeViewObject.value = response.data.data;
    // });

    EventAPI.getStoreEvent(userId.value).then((response) => {
        eventCards.value = response.data.data;
    });
});
</script>

<style scoped lang="scss">
.store-introduction {
    background: linear-gradient(180deg, #fff6cc 0%, #ffffff 100%);
}
</style>
