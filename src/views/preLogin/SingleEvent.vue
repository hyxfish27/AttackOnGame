<template>
    <div class="single-event container-fluid">
        <div class="container py-4">
            <div class="row">
                <div class="col-8">
                    <div class="event-image mb-4 rounded-2">
                        <img
                            ref="image"
                            class="w-100 inset-0 object-fit-cover rounded-2"
                            :src="eventData.eventImageUrl"
                            :alt="eventData.title"
                        />
                    </div>
                    <div class="event-description mb-4">
                        <h6
                            class="text-primary fw-bold pb-2 border-bottom border-2 border-primary"
                        >
                            詳細內容
                        </h6>
                        <p>{{ eventData.description }}</p>
                    </div>
                    <div class="event-store">
                        <div
                            class="event-store-card bg-greyF7 border-1 border border-grey rounded-2 p-4"
                        >
                            <p
                                class="fw-bold pb-2 border-bottom border-2 border-greyD3"
                            >
                                店家資料
                            </p>
                            <div class="d-flex">
                                <div class="me-3">
                                    <img
                                        class="w-100 rounded-2"
                                        :src="storeData.avatar"
                                        :alt="storeData.name"
                                    />
                                </div>
                                <div>
                                    <h6 class="fw-bold">
                                        {{ storeData.name }}
                                    </h6>
                                    <p>{{ eventData.address }}</p>
                                    <p>{{ eventData.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="event-message"></div>
                </div>
                <div class="col-4">
                    <div class="event-header mb-4">
                        <div
                            class="bg-success fw-bold py-1 px-2 d-inline-block"
                        >
                            已滿團
                        </div>
                        <h6 class="fw-bold my-2">{{ eventData.title }}</h6>
                        <p class="mb-2">{{ eventData.address }}</p>
                        <div class="progress-bar">
                            <div>報名進度條</div>
                            <div>TODO</div>
                        </div>
                    </div>
                    <div class="event-info">
                        <div
                            class="event-info__card border border-grey66 p-3 pt-0 rounded-2 bg-white"
                        >
                            <!-- TODO: 補上 icon -->
                            <p
                                class="bg-greyE9 fw-bold pt-1 pb-2 px-2 mb-2 d-inline-block rounded-bottom-2"
                            >
                                活動模式
                            </p>

                            <div class="d-flex mb-2">
                                <div class="mr-2">icon</div>
                                <div>
                                    <h6 class="fw-bold mb-1">
                                        {{ eventData.participationFee }}幣 /
                                        活動費用
                                    </h6>
                                    <p>
                                        參與活動所需的費用，可能包含場地、材料等各種成本。
                                    </p>
                                </div>
                            </div>

                            <hr class="bg-greyE9" />

                            <div class="d-flex mb-2">
                                <div class="mr-2">
                                    <div v-if="eventData.isFoodAllowed">
                                        isFoodAllowed icon
                                    </div>
                                    <div v-else>isFoodNotAllowed icon</div>
                                </div>
                                <div>
                                    <h6 class="text-primary fw-bold mb-1">
                                        {{
                                            eventData.isFoodAllowed
                                                ? '可'
                                                : '不可'
                                        }}帶外食
                                    </h6>
                                    <p>
                                        關於參與者是否可以攜帶外部食物到活動場地的規定。
                                    </p>
                                </div>
                            </div>

                            <div class="d-flex mb-2">
                                <div class="mr-2">icon</div>
                                <div>
                                    <h6 class="fw-bold mb-1">
                                        最低人數
                                        {{ eventData.minParticipants }} 人
                                    </h6>
                                    <p>確保活動能順利進行的最小參與者數量。</p>
                                </div>
                            </div>

                            <div class="d-flex mb-2">
                                <div class="mr-2">icon</div>
                                <div>
                                    <h6 class="fw-bold mb-1">
                                        最高人數
                                        {{ eventData.minParticipants }} 人
                                    </h6>
                                    <p>
                                        為了保證活動質量和參與者體驗，設定的最大參與者數量。
                                    </p>
                                </div>
                            </div>

                            <div class="d-flex mb-2"></div>
                            <div class="d-flex mb-2"></div>

                            <button
                                class="btn btn-primary w-100"
                                @click="onButtonClick"
                            >
                                我要報名
                            </button>

                            <div class="d-flex mt-2">
                                <p>icon</p>
                                <p>截止時間： {{ eventData.eventEndTime }}</p>
                            </div>
                        </div>
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
import StoreAPI from '@/api/Store';

const route = useRoute();

const eventData = ref({});

const storeData = ref({});

const getEvent = async (eventId) => {
    await EventAPI.getEvent(eventId)
        .then((response) => {
            eventData.value = response.data.data;

            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
};

const getStore = async (storeId) => {
    await StoreAPI.get(storeId)
        .then((response) => {
            storeData.value = response.data.data;

            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
};

// TODO: 暫時想不到好的命名QQ
const onButtonClick = () => {
    // 去到結帳頁
    console.log('click');
};

onMounted(() => {
    const { eventId } = route.params;

    getEvent(eventId);

    const { storeId } = eventData.value;

    getStore(storeId);
});
</script>

<style scoped lang="scss">
.single-event {
    background: linear-gradient(180deg, #fff6cc 0%, #ffffff 100%);

    .event-image {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
}
</style>
