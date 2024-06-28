<template>
    <div class="single-event container-fluid positon-relative lh-lg">
        <Loading
            v-if="isLoading"
            :class="{ 'loading-fade': !isLoading }"
        ></Loading>
        <div class="container py-4">
            <div class="row">
                <div class="col-8">
                    <div class="event-image mb-4 rounded-2">
                        <img
                            ref="image"
                            referrerpolicy="no-referrer"
                            class="w-100 inset-0 object-fit-cover rounded-2"
                            :src="eventData.eventImageUrl"
                            :alt="eventData.title"
                        />
                    </div>
                    <div class="event-description mb-4">
                        <div class="sub-title_wrap">
                            <h2
                                class="text-primary fw-bold pb-2 border-bottom border-2 border-primary fz-6 d-inline-block sub-title mb-0"
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
                            <div class="d-flex mt-4 align-items-center">
                                <div class="img-wrap round">
                                    <img
                                        referrerpolicy="no-referrer"
                                        class="w-100"
                                        :src="storeData.avatar"
                                        :alt="storeData.name"
                                    />
                                </div>
                                <div class="">
                                    <h3 class="fz-6 fw-bold">
                                        {{ storeData.name }}
                                    </h3>
                                    <p class="line-clamp line-clamp-3">
                                        {{ storeData.introduce }}
                                    </p>
                                    <div
                                        class="d-flex align-items-center justify-content-end"
                                    >
                                        <span
                                            class="material-symbols-outlined text-primary"
                                        >
                                            double_arrow
                                        </span>
                                        <router-link
                                            v-if="storeData && storeData._id"
                                            class="link text-primary"
                                            :to="{
                                                name: 'StoreIntroduction',
                                                params: {
                                                    userId: storeData._id,
                                                },
                                            }"
                                            >查看詳情</router-link
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="event-message"></div>
                    <div class="event-description mt-4">
                        <div class="sub-title_wrap">
                            <h2
                                class="text-primary fw-bold pb-2 border-bottom border-2 border-primary fz-6 d-inline-block sub-title mb-0"
                            >
                                地理位置
                            </h2>
                        </div>
                        <div class="d-flex mt-2 align-items-center">
                            <span
                                class="fz-6 material-symbols-outlined text-greyD4 mr-2"
                            >
                                location_on
                            </span>
                            <p>{{ storeData.address }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-4 position-sticky top-0">
                    <div class="event-header mb-4">
                        <div
                            class="fw-bold py-1 px-2 d-inline-block"
                            :class="eventPrograss.bgcColor"
                        >
                            {{ eventPrograss.text }}
                        </div>
                        <h3 class="fz-6 fw-bold my-2">{{ eventData.title }}</h3>
                        <div class="d-flex mb-2 align-items-center">
                            <span
                                class="fz-6 material-symbols-outlined text-greyD4 mr-2"
                            >
                                location_on
                            </span>
                            <p class="">{{ eventData.address }}</p>
                        </div>
                        <div class="shape bg-greyE9">
                            <p class="">報名進度條</p>
                        </div>
                        <div class=""></div>
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

                            <div class="d-flex mb-2 align-items-center">
                                <span
                                    class="material-symbols-outlined icon-48 text-greyD4 mr-2"
                                >
                                    paid
                                </span>
                                <div>
                                    <h3 class="fz-6 fw-bold mb-1 text-primary">
                                        {{
                                            toLocalString(
                                                eventData.participationFee
                                            )
                                        }}
                                        NT
                                        <span class="fz-4 text-dark"
                                            >/ 活動費用</span
                                        >
                                    </h3>
                                    <p>
                                        參與活動所需的費用，可能包含場地、材料等各種成本。
                                    </p>
                                </div>
                            </div>

                            <hr class="bg-greyE9" />

                            <div class="d-flex mb-2 align-items-center">
                                <span
                                    class="material-symbols-outlined icon-48 text-greyD4 mr-2"
                                >
                                    fastfood
                                </span>
                                <div>
                                    <h3 class="fz-6 text-primary fw-bold mb-1">
                                        {{
                                            eventData.isFoodAllowed
                                                ? '可'
                                                : '不可'
                                        }}<span class="text-dark">帶外食</span>
                                    </h3>
                                    <p>
                                        關於參與者是否可以攜帶外部食物到活動場地的規定。
                                    </p>
                                </div>
                            </div>

                            <div class="d-flex mb-2 align-items-center">
                                <span
                                    class="material-symbols-outlined icon-48 text-greyD4 mr-2"
                                >
                                    person_remove
                                </span>
                                <div>
                                    <h3 class="fz-6 fw-bold mb-1">
                                        最低人數
                                        {{ eventData.minParticipants || 0 }} 人
                                    </h3>
                                    <p>確保活動能順利進行的最小參與者數量。</p>
                                </div>
                            </div>

                            <div class="d-flex mb-2 align-items-center">
                                <span
                                    class="material-symbols-outlined icon-48 text-greyD4 mr-2"
                                >
                                    person_add
                                </span>
                                <div>
                                    <h3 class="fz-6 fw-bold mb-1">
                                        最高人數
                                        {{ eventData.maxParticipants || 0 }} 人
                                    </h3>
                                    <p>
                                        為了保證活動質量和參與者體驗，設定的最大參與者數量。
                                    </p>
                                </div>
                            </div>

                            <div class="d-flex mb-2"></div>
                            <div class="d-flex mb-2"></div>

                            <button
                                :disabled="
                                    isEventClosed ||
                                    isEventUnregiistable ||
                                    isShopper
                                "
                                class="btn btn-primary w-100"
                                :data-test="eventData.idNumber"
                                @click="goCheckout(eventData.idNumber)"
                            >
                                我要報名
                            </button>

                            <div class="d-flex mt-2 align-items-center">
                                <span
                                    class="material-symbols-outlined fz-6 text-greyD4 mr-2"
                                >
                                    date_range
                                </span>
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
import setEventAttr from '@/utilities/setEventAttr';
import STATUS_MAP from '@/constant/eventStatus';
import toLocalString from '@/utilities/toLocalString';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EventAPI from '@/api/Event';
import StoreAPI from '@/api/Store';
import dayjs from '@/utilities/dayjs';
import Loading from '@/components/common/Loading.vue';
import useIndexStore from '@/stores/index';

const route = useRoute();

const eventData = ref({});

const storeData = ref({});

const isLoading = ref(true);
const isShopper = useIndexStore().userData.role === 'store';

const getEvent = async (eventId) => {
    await EventAPI.getEvent(eventId)
        .then((response) => {
            eventData.value = response.data.data.event;
            storeData.value = response.data.data.store;

            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setTimeout(() => {
                isLoading.value = false;
            }, 500);
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
const today = dayjs();
const isEventClosed = computed(() => {
    return (
        today.isBefore(eventData.value.registrationStartTime) ||
        today.isAfter(eventData.value.registrationEndTime)
    );
});
const isEventUnregiistable = computed(() => {
    return (
        eventData.value.currentParticipantsCount ===
        eventData.value.maxParticipants
    );
});
const eventPrograss = computed(() => {
    if (Object.keys(eventData.value).length === 0) {
        return {};
    }
    const status = setEventAttr(eventData.value);
    return {
        text: STATUS_MAP[status].text,
        bgcColor: STATUS_MAP[status].barColor,
    };
});
const router = useRouter();
const goCheckout = (eventId) => {
    router.push({ name: 'Checkout', params: { eventId } });
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
    .shape {
        padding-left: 8px;
        width: 120px;
        height: 1.5rem;
        clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
    }
    .mr-2 {
        margin-right: 8px;
    }
    .icon-48 {
        font-size: 48px;
    }
    .fz-6 {
        font-size: 24px;
    }

    .fz-4 {
        font-size: 16px;
    }

    .round {
        border-radius: 50%;
    }
    .link {
        display: block;
        text-align: end;
        text-decoration: none;
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
    .img-wrap {
        flex-shrink: 0;
        overflow: hidden;
        margin-right: 8px;
        width: 150px;
        height: 150px;
        img {
            min-width: 100%;
            min-height: 100%;
            object-fit: cover;
        }
    }
}
.single-event {
    background: linear-gradient(180deg, #fff6cc 0%, #ffffff 100%);

    .event-image {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
}
</style>
