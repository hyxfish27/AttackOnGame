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
                        <div class="sub-title_wrap">
                            <h2
                                class="text-primary fw-bold pb-2 border-bottom border-2 border-primary fs-6 d-inline-block sub-title mb-0"
                            >
                                詳細內容
                            </h2>
                        </div>
                        <p class="mt-4">{{ eventData.description }}</p>
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
                    <div class="event-description mt-4">
                        <div class="sub-title_wrap">
                            <h2
                                class="text-primary fw-bold pb-2 border-bottom border-2 border-primary fs-6 d-inline-block sub-title mb-0"
                            >
                                活動答疑區
                            </h2>
                        </div>
                        <p class="mt-4">{{ eventData.description }}</p>
                    </div>
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
                                <div class="icon-img_wrap mr-2">
                                    <image
                                        :src="moneyIcon"
                                        class="w-100"
                                    ></image>
                                </div>
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
                                <div class="icon-img_wrap mr-2">
                                    <image
                                        :src="foodIcon"
                                        class="w-100"
                                    ></image>
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
                                <div class="icon-img_wrap mr-2">
                                    <image
                                        :src="minPeopleIcon"
                                        class="w-100"
                                    ></image>
                                </div>
                                <div>
                                    <h6 class="fw-bold mb-1">
                                        最低人數
                                        {{ eventData.minParticipants }} 人
                                    </h6>
                                    <p>確保活動能順利進行的最小參與者數量。</p>
                                </div>
                            </div>

                            <div class="d-flex mb-2">
                                <div class="icon-img_wrap mr-2">
                                    <image
                                        :src="maxPeopleIcon"
                                        class="w-100"
                                    ></image>
                                </div>
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
                                :data-test="eventData.idNumber"
                                @click="goCheckout(eventData.idNumber)"
                            >
                                我要報名
                            </button>

                            <div class="d-flex mt-2">
                                <div class="icon-img_wrap mr-2">
                                    <image
                                        :src="timeIcon"
                                        class="w-100"
                                    ></image>
                                </div>
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
import { useRoute, useRouter } from 'vue-router';
import EventAPI from '@/api/Event';
import StoreAPI from '@/api/Store';
import foodIcon from '@/assets/images/event/event-food.png';
import minPeopleIcon from '@/assets/images/event/event-min-people.png';
import moneyIcon from '@/assets/images/event/event-money.png';
import timeIcon from '@/assets/images/event/event-time.png';
import maxPeopleIcon from '@/assets/images/event/evet-max-people.png';

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

const router = useRouter();
const goCheckout = (eventId) => {
    router.push({ name: 'Checkout', params: { eventId } });
    console.log('store');
};

onMounted(() => {
    const { eventId } = route.params;

    getEvent(eventId);

    const { storeId } = eventData.value;

    getStore(storeId);
});
</script>

<style scoped lang="scss">
.fs-6 {
    font-size: 24px;
}
.icon-img_wrap {
    width: 50px;
    height: 50px;
}
.sub-title_wrap {
    position: relative;
    .sub-title {
        position: relative;
        z-index: 2;
    }
    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        border-bottom: 2px solid #d4d4d4;
    }
}
.single-event {
    background: linear-gradient(180deg, #fff6cc 0%, #ffffff 100%);

    .event-image {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
}
</style>
