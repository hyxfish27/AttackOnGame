<template>
    <div class="container-xxl">
        <div class="row p-3 align-items-stretch">
            <LeftEl></LeftEl>
            <div class="col-9 border rounded bg-white h-100 p-3 min-h-screen">
                <div class="fs-7 fw-bold pb-3 border-bottom">
                    {{ order.title }}
                </div>
                <div class="py-2 d-flex gap-4 border-bottom">
                    <div>
                        <p class="text-grey9F fs-10">銷售額</p>
                        <p class="fw-bold">
                            NT$
                            {{
                                order.participationFee *
                                order.currentParticipantsCount
                            }}
                        </p>
                    </div>
                    <div>
                        <p class="text-grey9F fs-10">報名狀態</p>
                        <p class="fw-bold">
                            {{ order.currentParticipantsCount }}/{{
                                order.maxParticipants
                            }}
                        </p>
                    </div>
                </div>
                <div class="py-2 d-flex gap-4 border-bottom">
                    <div>
                        <p class="text-grey9F fs-10">成團人數</p>
                        <p class="fw-bold">
                            {{ order.minParticipants }}
                        </p>
                    </div>
                    <div>
                        <p class="text-grey9F fs-10">活動日期</p>
                        <p class="fw-bold">
                            {{ order.eventStartTime }}
                        </p>
                    </div>
                    <div>
                        <p class="text-grey9F fs-10">活動地址</p>
                        <p class="fw-bold">
                            {{ order.address }}
                        </p>
                    </div>
                </div>
                <div
                    class="d-grid pb-2 pt-3 gap-2 text-grey9F border-bottom"
                    style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr"
                >
                    <p>報名者</p>
                    <p>總額</p>
                    <p>數量</p>
                    <p>付款方式</p>
                    <p>付款狀態</p>
                    <p>訂單編號</p>
                </div>
                <div
                    v-for="user in users"
                    :key="user.idNumber"
                    class="d-grid gap-2 py-2 border-bottom"
                    style="grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr"
                >
                    <p>{{ user.name }}</p>
                    <p>{{ user.payment }}</p>
                    <p>{{ user.registrationCount }}</p>
                    <p>{{ user.paymentMethod }}</p>
                    <p>{{ user.paymentStatus }}</p>
                    <p>{{ user.idNumber }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import LeftEl from '@/components/store/StoreLeftEl.vue';
import StoreAPI from '@/api/Store';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const users = ref([]);
const order = ref({});
const router = useRouter();
const route = useRoute();

const getOrder = async (idNumber) => {
    await StoreAPI.getTheOrder(idNumber)
        .then((res) => {
            console.log('order', res);
            order.value = res.data.data.event;
            users.value = res.data.data.user;
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
    getOrder(idNumber);

    // event.value = testData.event;
    // order.value = testData.order;
    // tickets.value = testData.tickets;
});
</script>
<style lang="scss" scoped>
body {
    background-color: #f7f7f7;
}
</style>
