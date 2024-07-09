<template>
    <div class="container-xxl">
        <div class="row p-3">
            <Loading
                v-if="isLoading"
                :class="{ 'loading-fade': !isLoading }"
            ></Loading>
            <LeftEl></LeftEl>
            <div class="col-9 ps-3 admin-activity-panel">
                <div class="border rounded bg-white min-h-screen p-3">
                    <div
                        class="d-flex justify-content-between align-items-center pb-3 border-bottom"
                    >
                        <p class="fs-7 fw-bold">
                            {{ order.title }}
                        </p>
                        <router-link
                            :to="{ name: 'ScannerTicket', params: idNumber }"
                            class="btn btn-primary text-white fw-bold px-4 signup-button d-flex justify-content-between"
                        >
                            <span class="material-symbols-outlined">
                                qr_code_scanner
                            </span>
                            <p class="mx-1">驗證票券</p>
                        </router-link>
                    </div>
                    <div class="py-2 d-flex gap-4 border-bottom">
                        <div>
                            <p class="text-grey9F fs-10">銷售額</p>
                            <p class="fw-bold">
                                NT$
                                {{
                                    toLocalString(
                                        order.participationFee *
                                            order.currentParticipantsCount
                                    )
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
                            <p class="text-grey9F fs-10">最低成團人數</p>
                            <p class="fw-bold">
                                {{ order.minParticipants }}
                            </p>
                        </div>
                        <div>
                            <p class="text-grey9F fs-10">最高滿團人數</p>
                            <p class="fw-bold">
                                {{ order.maxParticipants }}
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
                        style="
                            grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr 1fr;
                        "
                    >
                        <p>報名者</p>
                        <p>總額</p>
                        <p>數量</p>
                        <p>付款方式</p>
                        <p>付款狀態</p>
                        <p>訂單編號</p>
                        <p>操作</p>
                    </div>
                    <div v-if="usersAttr.length === 0">
                        <EmptyField text="還沒有人下訂單唷"></EmptyField>
                    </div>
                    <div
                        v-for="user in usersAttr"
                        v-else
                        :key="user.idNumber"
                        class="d-grid gap-2 py-2 border-bottom table-body"
                        style="
                            grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr 1fr;
                        "
                    >
                        <div class="d-flex align-items-center">
                            <div
                                class="profile-img rounded-circle small-profile-img mx-1"
                            >
                                <img :src="user.imgUrl" alt="" />
                            </div>
                            <p class="line-clamp-1 line-clamp">
                                {{ user.name }}
                            </p>
                        </div>
                        <p class="lh-2">{{ user.payment }}</p>
                        <p class="lh-2">{{ user.registrationCount }}</p>
                        <p class="lh-2">{{ user.paymentMethod }}</p>
                        <p class="lh-2">{{ user.paymentStatus }}</p>
                        <p class="lh-2">{{ user.idNumber }}</p>
                        <div class="d-flex">
                            <a
                                v-tooltip="user.phoneFormatter"
                                :href="`tel:${user.phoneValue}`"
                            >
                                <span
                                    class="cursor material-symbols-outlined text-grey33"
                                >
                                    phone_iphone
                                </span>
                            </a>
                            <div v-if="user.notes">
                                <span
                                    v-tooltip="user.notes"
                                    class="cursor material-symbols-outlined text-grey33"
                                >
                                    note_stack
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import LeftEl from '@/components/store/StoreLeftEl.vue';
import StoreAPI from '@/api/Store';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import toLocalString from '@/utilities/toLocalString';
import { PaymentStatus, PaymentMethod } from '@/constant/orderStatus';
import EmptyField from '@/components/common/EmptyField.vue';
import Loading from '@/components/common/Loading.vue';
import useAlert from '@/stores/alert';
import { vTooltip } from 'floating-vue';
import 'floating-vue/dist/style.css';

const alterStore = useAlert();
const users = ref([]);
const order = ref({});
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);

const usersAttr = computed(() => {
    return users.value.map((x) => ({
        name: x.name,
        phoneFormatter: x.phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3'),
        phoneValue: x.phone.replace(/^0(\d{3})(\d{6})$/, '+886-$1$2'),
        notes: x.notes,
        payment: toLocalString(x.payment),
        registrationCount: x.registrationCount,
        paymentMethod: PaymentMethod[x.paymentMethod],
        paymentStatus: PaymentStatus[x.paymentStatus],
        idNumber: x.idNumber,
        imgUrl: x.avatar,
    }));
});

const getOrder = async (idNumber) => {
    await StoreAPI.getTheOrder(idNumber)
        .then((res) => {
            console.log('order', res);
            order.value = res.data.data.event;
            users.value = res.data.data.user;
            setTimeout(() => {
                isLoading.value = false;
            }, 500);
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
                alterStore.openModal('error', '請先完成登入');
                router.push({
                    name: 'PlayerLogin',
                });
            } else {
                alterStore.openModal('error', `${err.response.data.message}`);
            }
            isLoading.value = false;
        });
};
onMounted(() => {
    const { idNumber } = route.params;
    getOrder(idNumber);
});
</script>
<style lang="scss" scoped>
body {
    background-color: #f7f7f7;
}
.admin-activity-panel {
    .lh-2 {
        line-height: 2rem;
    }
}
.profile-img {
    width: 54px;
    height: 54px;
    overflow: hidden;
    background-color: #fff;
    &.ss {
        width: 2rem;
        height: 2rem;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
