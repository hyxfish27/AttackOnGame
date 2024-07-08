<template>
    <div class="container ticket-page_wrap">
        <Loading
            v-if="isLoading"
            :class="{ 'loading-fade': !isLoading }"
        ></Loading>
        <div class="row py-3 justify-content-center">
            <div
                class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg position-relative"
            >
                <RollBack
                    v-if="store && store._id"
                    class="mt-2"
                    :route-link="{ name: 'PlayerActivity', params: {} }"
                ></RollBack>
                <div class="px-4 pb-3">
                    <p class="fw-bold fs-6">
                        {{ event.title }}
                    </p>
                    <p class="fs-10 text-grey9F fw-bold">訂單編號</p>
                    <p>{{ order.idNumber }}</p>
                </div>

                <div class="px-4 pt-3 pb-5 border-top bor-bttom-s-dot">
                    <div class="d-flex flex-wrap gap-4">
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">時間</p>
                            <p>{{ event.eventStartTime }} ~</p>
                            <p>{{ event.eventEndTime }}</p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">預定人</p>
                            <p>{{ order.name }}</p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">數量</p>
                            <p>{{ order.registrationCount }}人</p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">票價</p>
                            <p>
                                NT$ {{ event.participationFee }} / 張，共 NT${{
                                    order.payment
                                }}
                                元
                            </p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">付款狀態</p>
                            <p>{{ order.paymentStatus }}</p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">付款方式</p>
                            <p>{{ order.paymentMethod }}</p>
                        </div>
                        <div class="w-45">
                            <p class="fs-10 text-grey9F fw-bold">訂單備註</p>
                            <p>{{ order.note }}</p>
                        </div>
                    </div>
                </div>
                <div class="pt-5 d-flex flex-wrap justify-content-center gap-3">
                    <QRCodeVue3
                        v-for="img in tickets"
                        :key="img.idNumber"
                        :value="value"
                        myclass="w-40"
                    />
                </div>
            </div>
        </div>
        <div class="row py-3 justify-content-center">
            <div
                class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg"
            >
                <p class="fs-7 fw-bold border-bottom pb-3 mb-3">活動詳情</p>
                <p>地址：{{ event.address }}</p>
                <p>最小成團人數：{{ event.minParticipants }}</p>
                <p>最大成團人數：{{ event.maxParticipants }}</p>
                <div
                    v-if="event && event.idNumber"
                    class="d-flex align-items-center justify-content-end"
                >
                    <router-link
                        class="btn btn-outline-primary d-flex align-items-center"
                        :to="{
                            name: 'SingleEvent',
                            params: {
                                eventId: event.idNumber,
                            },
                        }"
                    >
                        <span class="material-symbols-outlined fs-9 pe-1">
                            double_arrow </span
                        >查看活動詳情</router-link
                    >
                </div>
            </div>
        </div>
        <div class="row py-3 justify-content-center">
            <div
                class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg"
            >
                <p class="fs-7 fw-bold border-bottom pb-3 mb-3">店家資料</p>
                <div class="ticket-page-store_wrap">
                    <div class="d-flex mt-4 align-items-center gap-3">
                        <div class="img-wrap round">
                            <img
                                referrerpolicy="no-referrer"
                                class="w-100"
                                :src="store.avatar"
                                :alt="store.name"
                            />
                        </div>
                        <div class="">
                            <h3 class="fs-7 fw-bold mb-3">
                                {{ store.name }}
                            </h3>
                            <p class="line-clamp line-clamp-3">
                                {{ store.introduce }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="d-flex align-items-center justify-content-end pt-2"
                    >
                        <router-link
                            v-if="store && store._id"
                            class="btn btn-outline-primary"
                            :to="{
                                name: 'StoreIntroduction',
                                params: {
                                    userId: store._id,
                                },
                            }"
                        >
                            <span class="material-symbols-outlined fe-1 fs-9">
                                double_arrow
                            </span>
                            查看店家詳情</router-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import PlayerAPI from '@/api/Player';
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading from '@/components/common/Loading.vue';
import toLocalString from '@/utilities/toLocalString';
import formatTaiwanPhoneNumber from '@/utilities/formatTaiwanPhoneNumber';
import { PaymentStatus, PaymentMethod } from '@/constant/orderStatus';
import useAlert from '@/stores/alert';
import RollBack from '@/components/common/rollBack.vue';
import QRCodeVue3 from 'qrcode-vue3';

const alterStore = useAlert();
const isLoading = ref(true);
const router = useRouter();
const route = useRoute();
const store = ref({});
const event = ref({});
const rawOrder = ref({});
const tickets = ref([]);

const getTicket = async (idNumber) => {
    isLoading.value = true;
    await PlayerAPI.getTicket(idNumber)
        .then((res) => {
            store.value = res.data.data.store;
            event.value = res.data.data.event;
            rawOrder.value = res.data.data.order;
            tickets.value = res.data.data.tickets;
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status >= 400) {
                alterStore.openModal('error', '請先完成登入唷');
                router.push({
                    name: 'PlayerLogin',
                });
            } else {
                alert(`${err.response.data.message}`);
                console.log(err);
            }
        })
        .finally(() => {
            setTimeout(() => {
                isLoading.value = false;
            }, 500);
        });
};
onMounted(() => {
    const { idNumber } = route.params;
    getTicket(idNumber);
});
const order = computed(() => {
    return {
        phone: formatTaiwanPhoneNumber(rawOrder.value.phone),
        payment: toLocalString(rawOrder.value.payment),
        name: rawOrder.value.name,
        paymentStatus: PaymentStatus[rawOrder.value.paymentStatus],
        paymentMethod: PaymentMethod[rawOrder.value.paymentMethod],
        registrationCount: rawOrder.value.registrationCount,
        discount: rawOrder.value.discount,
        note: rawOrder.value.note ?? '無',
    };
});
</script>
<style lang="scss" scope>
body {
    background-color: #f7f7f7;
}

.bor-bttom-s-dot {
    border-bottom: 2px dotted #d4d4d4;
}

.btn-outline-primary:hover {
    color: #ffff !important;
}

.ticket-page-store_wrap {
    .img-wrap {
        flex-shrink: 0;
        overflow: hidden;
        margin-right: 8px;
        width: 150px;
        height: 150px;
        border-radius: 50%;

        img {
            min-width: 100%;
            min-height: 100%;
            object-fit: cover;
        }
    }
}
</style>
