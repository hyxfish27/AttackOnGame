<template>
    <div class="single-event container-fluid positon-relative lh-lg">
        <modal ref="BsModal" title="很抱歉" :text="ModalText"></modal>
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
                    <div class="event-message mt-4">
                        <div class="sub-title_wrap mb-3">
                            <h2
                                class="text-primary fw-bold pb-2 border-bottom border-2 border-primary fz-6 d-inline-block sub-title mb-0"
                            >
                                活動答擬區
                            </h2>
                        </div>

                        <div>
                            <div class="p-3 bg-white border rounded">
                                <div
                                    v-if="!isLogin"
                                    class="bg-greyF7 p-3 border rounded mb-3 d-flex justify-content-center align-items-center"
                                >
                                    <span
                                        class="material-symbols-outlined text-grey9F"
                                    >
                                        sms
                                    </span>
                                    <router-link
                                        :to="{ name: 'Login' }"
                                        class="text-primary btn"
                                        >登入會員後</router-link
                                    >
                                    <p>後，即可留下你的意見！</p>
                                </div>
                                <div
                                    v-if="messageData?.length === 0"
                                    class="bg-greyF7 p-3 border rounded mb-3"
                                >
                                    <p class="text-center">尚未有人留言</p>
                                </div>
                                <div
                                    v-if="isLogin && !isShopper"
                                    class="bg-greyF7 p-3 border rounded mb-3"
                                >
                                    <div class="d-flex flex-column">
                                        <div
                                            style="
                                                width: 40px;
                                                height: 40px;
                                                overflow: hidden;
                                            "
                                            class="rounded-circle mb-2"
                                        >
                                            <img
                                                style="object-fit: cover"
                                                class="w-100 h-100"
                                                :src="PlayerData.avatar"
                                                alt=""
                                            />
                                        </div>
                                        <textarea
                                            id="question"
                                            v-model="myMessageContent.content"
                                            name="question"
                                            class="form-control bg-white"
                                            cols="30"
                                            rows="3"
                                            placeholder="請輸入留言"
                                        ></textarea>
                                        <button
                                            class="btn btn-primary mt-2 align-self-end"
                                            :disabled="
                                                myMessageContent.content === ''
                                            "
                                            @click="
                                                postMyMessageContent(
                                                    eventData.idNumber,
                                                    {
                                                        content:
                                                            myMessageContent.content,
                                                    }
                                                )
                                            "
                                        >
                                            送出留言
                                        </button>
                                    </div>
                                </div>
                                <div v-if="messageData?.length > 0">
                                    <div
                                        v-for="(mes, index) in result"
                                        :key="mes._id"
                                        class="px-3 border-bottom mb-3"
                                    >
                                        <div class="mb-3">
                                            <div
                                                class="d-flex gap-3 align-items-center justify-content-between"
                                            >
                                                <div
                                                    class="d-flex gap-3 align-items-center"
                                                >
                                                    <div
                                                        style="
                                                            width: 40px;
                                                            height: 40px;
                                                            overflow: hidden;
                                                        "
                                                        class="rounded-circle mb-2"
                                                    >
                                                        <img
                                                            style="
                                                                object-fit: cover;
                                                            "
                                                            class="w-100 h-100"
                                                            :src="
                                                                mes?.comment
                                                                    .avatar
                                                            "
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p
                                                        class="text-primary fw-bold"
                                                    >
                                                        {{
                                                            mes?.comment
                                                                .authorName
                                                        }}
                                                    </p>
                                                </div>
                                                <p class="text-grey9F fs-9">
                                                    {{ mes?.comment.createdAt }}
                                                </p>
                                            </div>
                                            <p>
                                                {{ mes?.comment.content }}
                                            </p>
                                            <button
                                                v-if="
                                                    isLogin &&
                                                    isLoginUser ===
                                                        storeData.user
                                                "
                                                type="button"
                                                class="btn btn-outline-dark"
                                                @click="toggleReplyBox(index)"
                                            >
                                                回覆
                                            </button>
                                        </div>
                                        <div
                                            v-for="reply in mes?.replies"
                                            :key="reply._id"
                                            class="mb-3"
                                        >
                                            <div
                                                class="d-flex gap-3 align-items-center justify-content-between"
                                            >
                                                <div
                                                    class="d-flex gap-3 align-items-center"
                                                >
                                                    <div
                                                        style="
                                                            width: 40px;
                                                            height: 40px;
                                                            overflow: hidden;
                                                        "
                                                        class="rounded-circle mb-2"
                                                    >
                                                        <img
                                                            style="
                                                                object-fit: cover;
                                                            "
                                                            class="w-100 h-100"
                                                            :src="
                                                                storeData.avatar
                                                            "
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p
                                                        class="text-primary fw-bold"
                                                    >
                                                        {{ reply?.authorName }}
                                                    </p>
                                                    <span
                                                        class="bg-warning px-2 rounded fs-10"
                                                        >團主</span
                                                    >
                                                </div>
                                                <p class="text-grey9F fs-9">
                                                    {{ reply?.createdAt }}
                                                </p>
                                            </div>
                                            <p>{{ reply?.content }}</p>
                                        </div>
                                        <div
                                            v-if="
                                                isLogin &&
                                                isLoginUser ===
                                                    storeData.user &&
                                                isReplyBoxOpen === index
                                            "
                                        >
                                            <textarea
                                                id="question"
                                                v-model="
                                                    myMessageContent.content
                                                "
                                                name="question"
                                                class="form-control bg-white"
                                                cols="30"
                                                rows="3"
                                                placeholder="請輸入回覆"
                                            ></textarea>
                                            <div
                                                class="d-flex justify-content-end align-items-center py-2 gap-2"
                                            >
                                                <button
                                                    type=" button"
                                                    class="btn btn-outline-dark"
                                                >
                                                    取消
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-primary"
                                                    :disabled="
                                                        myMessageContent.content ===
                                                        ''
                                                    "
                                                    @click="
                                                        checkMyReply(
                                                            eventData.idNumber,
                                                            mes.comment._id,
                                                            {
                                                                content:
                                                                    myMessageContent.content,
                                                            }
                                                        )
                                                    "
                                                >
                                                    回覆留言
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="event-description mt-4">
                        <div class="sub-title_wrap">
                            <h2
                                class="text-primary fw-bold pb-2 border-bottom border-2 border-primary fz-6 d-inline-block sub-title mb-0"
                            >
                                地理位置
                            </h2>
                        </div>
                        <div class="d-flex mt-4 mb-4 align-items-center">
                            <span
                                class="fz-6 material-symbols-outlined text-greyD4 mr-2"
                            >
                                location_on
                            </span>
                            <p>{{ eventData.address }}</p>
                        </div>
                        <Location :location-data="locationData"></Location>
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
import Location from '@/components/event/Location.vue';
import useIndexStore from '@/stores/index';
import modal from '@/components/common/simpleModal.vue';

const route = useRoute();

const eventData = ref({});
const locationData = ref({});
const storeData = ref({});

const isLoading = ref(true);
const isShopper = useIndexStore().userData.role === 'store';
const isLoginUser = useIndexStore().userData.id;
const PlayerData = useIndexStore().playerData;
const { isLogin } = useIndexStore();

const getEvent = async (eventId) => {
    await EventAPI.getEvent(eventId)
        .then((response) => {
            eventData.value = response.data.data.event;
            storeData.value = response.data.data.store;
            locationData.value = response.data.data.event.location;
            console.log('storeData', response);
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
const result = ref([]);
// const formattedResult = ref(null);
const doForEach = (messageData) => {
    messageData.forEach((item) => {
        if (item.type === 'Comment') {
            result.value.push({
                _id: item._id,
                comment: { ...item },
                replies: [],
            });
        } else if (item.type === 'reply' && item.messageId) {
            const parent = result.value.find(
                (comment) => comment._id === item.messageId
            );
            if (parent) {
                parent.replies.push(item);
            }
        }
    });
    console.log('result', result.value);
};
const BsModal = ref(null);
const ModalText = ref('');
const messageData = ref(null);
const getMessage = async (eventId) => {
    await EventAPI.getEventMessage(eventId)
        .then((response) => {
            messageData.value = response.data.contents;
            doForEach(messageData.value);
            console.log('messageData.value', messageData.value);
        })
        .catch(() => {});
};
const myMessageContent = ref({
    content: '',
});
const postMyMessageContent = async (eventId, content) => {
    await EventAPI.postEventMessage(eventId, content)
        .then((res) => {
            console.log(res);
            result.value = [];
            getMessage(eventId);
            myMessageContent.value.content = '';
        })
        .catch(() => {
            ModalText.value = '很抱歉，您現在無法留言';
            BsModal.value.myModalShow();
        });
};
const postMyReply = async (eventId, messageId, content) => {
    await EventAPI.postReplyMessage(eventId, messageId, content)
        .then((res) => {
            console.log(res);
            result.value = [];
            getMessage(eventId);
            myMessageContent.value.content = '';
        })
        .catch(() => {
            ModalText.value = '很抱歉，您現在無法留言';
            BsModal.value.myModalShow();
        });
};
const checkMyReply = (eventId, messageId, content) => {
    console.log('eventId, messageId, content', eventId, messageId, content);
    postMyReply(eventId, messageId, content);
};
const isReplyBoxOpen = ref(null);

const toggleReplyBox = (index) => {
    if (isReplyBoxOpen.value === index) {
        isReplyBoxOpen.value = null;
    } else {
        isReplyBoxOpen.value = index;
        myMessageContent.value.content = ''; // 清空文本框内容
    }
};

onMounted(() => {
    console.log('isShopper', isShopper);
    const { eventId } = route.params;

    getEvent(eventId);
    getMessage(eventId);

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
    background: linear-gradient(180deg, #fff6cc 0%, #ffffff 35%);

    .event-image {
        box-shadow: 0px 4px 4pxrgba (0, 0, 0, 0.25);
    }
}
</style>
