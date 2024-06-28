<template>
    <div class="container">
        <div class="row py-3 justify-content-center">
            <div
                class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg"
            >
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
                    </div>
                </div>
                <div class="pt-5 d-flex flex-wrap justify-content-center gap-3">
                    <img
                        v-for="(img, idx) in tickets"
                        :key="img.orderId"
                        class="w-40"
                        :src="img.qrCodeUrl"
                        :alt="'活動票券' + (idx + 1)"
                    />
                </div>
            </div>
        </div>
        <div class="row py-3 justify-content-center">
            <div
                class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg"
            >
                <p class="fs-7 fw-bold border-bottom pb-3 mb-3">活動詳情</p>
                <p>票卷狀態：{{ order.status }}</p>
                <p>地址：{{ event.address }}</p>
                <p>已報名人數：{{ event.currentParticipantsCount }}</p>
            </div>
        </div>
        <div class="row py-3 justify-content-center">
            <div
                class="col-8 bg-white p-4 border rounded-3 noto-serif-tc lh-lg"
            >
                <p class="fs-7 fw-bold border-bottom pb-3 mb-3">店家資料</p>
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
                                    :src="store.avatar"
                                    :alt="store.name"
                                />
                            </div>
                            <div class="">
                                <h3 class="fz-6 fw-bold">
                                    {{ store.name }}
                                </h3>
                                <p class="line-clamp line-clamp-3">
                                    {{ store.introduce }}
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
                                        v-if="store && store._id"
                                        class="link text-primary"
                                        :to="{
                                            name: 'StoreIntroduction',
                                            params: {
                                                userId: store._id,
                                            },
                                        }"
                                        >查看詳情</router-link
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import PlayerAPI from '@/api/Player';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const store = ref({});
const event = ref({});
const order = ref({});
const tickets = ref([]);

const getTicket = async (idNumber) => {
    await PlayerAPI.getTicket(idNumber)
        .then((res) => {
            store.value = res.data.data.store;
            event.value = res.data.data.event;
            order.value = res.data.data.order;
            tickets.value = res.data.data.tickets;
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
    const { idNumber } = route.params;
    getTicket(idNumber);

    // event.value = testData.event;
    // order.value = testData.order;
    // tickets.value = testData.tickets;
});
</script>
<style lang="scss" scope>
body {
    background-color: #f7f7f7;
}

.bor-bttom-s-dot {
    border-bottom: 2px dotted #d4d4d4;
}
</style>
