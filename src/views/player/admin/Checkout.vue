<template>
    <div class="container">
        <div class="row py-3 justify-content-center player-admin-checkout">
            <div
                class="col-8 bg-white p-3 border rounded-3 noto-serif-tc lh-lg"
            >
                <div class="col-11 mx-auto py-4">
                    <h2 class="fw-bold pb-5 title">確認活動資訊</h2>
                    <h3 class="fw-bold sub-title mb-2">
                        {{ summaryData?.title }}
                    </h3>
                    <div class="d-flex align-items-center">
                        <span class="text-grey66 material-symbols-outlined">
                            location_on
                        </span>
                        <p class="text-grey66 fw-bold">
                            {{ summaryData?.address }}
                        </p>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="text-grey66 material-symbols-outlined">
                            date_range
                        </span>
                        <p class="text-grey66 fw-bold ps-1">
                            {{ summaryData?.eventStartTime }} ~
                            {{ summaryData?.eventEndTime }}
                        </p>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="text-grey66 material-symbols-outlined">
                            paid
                        </span>
                        <p class="text-grey66 fw-bold ps-1">
                            {{
                                toLocalString(summaryData?.participationFee)
                            }}/人
                        </p>
                    </div>
                </div>
                <div class="col-11 mx-auto py-4">
                    <div class="d-flex justify-content-between align-items-end">
                        <h4 class="fw-bold pb-3">核對報名資訊</h4>
                        <div>
                            <input
                                id="isDefaultData"
                                v-model="isDefaultChecked"
                                type="checkbox"
                                @change="handleCheckboxChange"
                            />
                            <label for="isDefaultData" class="form-label ps-1"
                                >帶入預設會員資料</label
                            >
                        </div>
                    </div>
                    <v-form v-slot="{ errors }" @submit="onSubmit">
                        <div class="mb-3 require-icon">
                            <label for="InputName" class="form-label"
                                >姓名</label
                            >
                            <v-field
                                id="InputName"
                                v-model="formData.userName"
                                type="text"
                                class="form-control"
                                aria-describedby="userNameHelp"
                                rules="required"
                                name="姓名"
                                :class="{ 'is-invalid': errors['姓名'] }"
                            ></v-field>
                            <error-message
                                name="姓名"
                                class="text-danger"
                            ></error-message>
                        </div>
                        <div class="mb-3 require-icon">
                            <label for="InputPhone" class="form-label"
                                >聯絡電話</label
                            >
                            <v-field
                                id="InputPhone"
                                v-model="formData.phoneNum"
                                type="text"
                                class="form-control"
                                rules="required|min:8|regex:^\d+$"
                                name="聯絡電話"
                                :class="{ 'is-invalid': errors['聯絡電話'] }"
                            ></v-field>
                            <error-message
                                name="聯絡電話"
                                class="text-danger"
                            ></error-message>
                        </div>
                        <div class="mb-3 require-icon">
                            <label for="personNum" class="form-label"
                                >報名人數
                                <span class="text-grey66"
                                    >(至多{{
                                        summaryData?.availableSeat
                                    }}人)</span
                                ></label
                            >
                            <v-field
                                id="personNum"
                                v-model="formData.personNum"
                                type="number"
                                class="form-control"
                                rules="required|regex:^(0*[1-9][0-9]*)$"
                                name="報名人數"
                                :max="summaryData?.maxParticipants"
                                :class="{ 'is-invalid': errors['報名人數'] }"
                            ></v-field>
                            <error-message
                                name="報名人數"
                                class="text-danger"
                            ></error-message>
                        </div>
                        <div class="mb-3">
                            <label for="inputRemark" class="form-label"
                                >備註</label
                            >
                            <textarea
                                id="inputRemark"
                                v-model="formData.note"
                                type="text"
                                class="form-control"
                                placeholder="有什麼想跟主揪說的話嗎？歡迎留言唷"
                                rows="5"
                                name="備註"
                            ></textarea>
                        </div>
                        <div class="mb-3 pt-3">
                            <p>付款金額</p>
                            <p>
                                {{
                                    toLocalString(
                                        formData.personNum *
                                            summaryData?.participationFee
                                    )
                                }}元
                            </p>
                        </div>
                        <div
                            class="py-4 justify-content-center d-flex flex-column"
                        >
                            <h4 class="fw-bold pb-3">了解活動政策</h4>
                            <p class="text-grey66 fw-bold">
                                請註明您已經閱讀並同意活動政策
                            </p>
                            <div class="d-flex align-items-center require-icon">
                                <label
                                    for="isAgree"
                                    class="d-flex align-items-center"
                                >
                                    <v-field
                                        id="isAgree"
                                        class="form-check-input mt-0 me-2"
                                        type="checkbox"
                                        value="請註明您已經閱讀並同意"
                                        aria-label="Checkbox for following text input"
                                        rules="required"
                                        name="同意活動政策"
                                        :class="{
                                            'is-invalid':
                                                errors['同意活動政策'],
                                        }"
                                    ></v-field>

                                    <p>我同意</p>
                                </label>

                                <button
                                    class="btn p-0 text-primary"
                                    @click="openModal"
                                >
                                    活動政策
                                </button>
                                <modal
                                    ref="BsModal"
                                    title="活動政策"
                                    :text="ContentText"
                                ></modal>
                            </div>
                            <error-message
                                name="同意活動政策"
                                class="text-danger"
                            ></error-message>
                            <div
                                class="py-4 gap-2 mt-5 justify-content-center d-flex align-items-center"
                            >
                                <RollBack
                                    v-if="theEventId"
                                    :route-link="{
                                        name: 'SingleEvent',
                                        params: { eventId: theEventId },
                                    }"
                                ></RollBack>
                                <button
                                    type="submit"
                                    class="btn btn-primary fw-bold px-4"
                                >
                                    確認報名，前往結帳
                                </button>
                            </div>
                        </div>
                    </v-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import RollBack from '@/components/common/rollBack.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useIndexStore from '@/stores/index';
import PlayerAPI from '@/api/Player';
import { useFormStore } from '@/stores/order';
import modal from '@/components/common/simpleModal.vue';
import toLocalString from '@/utilities/toLocalString';
import useAlert from '@/stores/alert';

const orderStore = useFormStore();
const router = useRouter();
const alterStore = useAlert();
const route = useRoute();
const BsModal = ref(null);
const openModal = () => {
    BsModal.value.myModalShow();
};

const ContentText = ref(
    '<p class="fw-bold">確認報名後，請留意以下幾點資訊:</p>1.活動當日未出現且未告知店家者，店家有權力將您設為黑名單，不得異議<br>2.若活動最終無法成團，本平台將會退費至您的帳戶中<br>3.活動最終的詮釋權，以店家為主若有任何問題，歡迎使用聊天室功能與店家訊息討論。'
);
const isDefaultChecked = ref(false);
const theEventId = ref('');
const summaryData = ref(null);
const formData = ref({
    title: '',
    address: '',
    startTime: '',
    endTime: '',
    userName: '',
    phoneNum: '',
    personNum: 1,
    note: '',
    payPrice: null,
});

const createPayment = async (orderId) => {
    try {
        const res = await PlayerAPI.createPayment({
            orderId,
        });
        orderStore.updatePaymentData(res.data);
        router.push({
            name: 'ReCheckout',
        });
    } catch (error) {
        console.log(error);
    }
};

const postOrder = async (formdata) => {
    await PlayerAPI.postOrder(formdata)
        .then((res) => {
            console.log(res);
            createPayment(res.data.idNumber);
        })
        .catch((err) => {
            if (err.response.data.message.includes('E11000')) {
                alterStore.openModal(
                    'error',
                    '每位玩家只能在一個活動上建立一筆訂單'
                );
            } else if (err.response.status === 401) {
                alterStore.openModal('error', '請先完成登入');
            } else {
                alterStore.openModal(
                    'error',
                    `${err.response.data.message || err?.code || 'Oh~'}`
                );
            }
        });
};

const onSubmitSuccess = () => {
    formData.value.payPrice =
        Number(formData.value.personNum) *
        Number(summaryData.value.participationFee);
    orderStore.updateFormData(formData.value);
    const postOrderObj = {
        eventId: theEventId.value,
        payment: Number(formData.value.payPrice),
        discount: 0, // 平台幣
        name: formData.value.userName,
        phone: String(formData.value.phoneNum),
        registrationCount: Number(formData.value.personNum),
        note: formData.value.note,
    };
    postOrder(postOrderObj);
};
const onSubmit = onSubmitSuccess;
const getSummary = async (eventid) => {
    await PlayerAPI.getSummary(eventid)
        .then((res) => {
            console.log(res);
            summaryData.value = res.data.data;
            formData.value.title = summaryData.value.title;
            formData.value.address = summaryData.value.address;
            formData.value.startTime = summaryData.value.eventStartTime;
            formData.value.endTime = summaryData.value.eventEndTime;
            summaryData.value.availableSeat =
                summaryData.value.maxParticipants -
                summaryData.value.minParticipants;
        })
        .catch((err) => {
            console.log(err);
        });
};
const indexStore = useIndexStore();
const useDefault = (data) => {
    console.log(data);
    formData.value.phoneNum = indexStore.playerData.phone;
    formData.value.userName = indexStore.playerData.name;
};
const handleCheckboxChange = () => {
    if (isDefaultChecked.value) {
        useDefault();
    } else {
        formData.value.phoneNum = '';
        formData.value.userName = '';
    }
};

onMounted(() => {
    const { eventId } = route.params;
    getSummary(eventId);
    theEventId.value = eventId;
    if (orderStore.isNew === false) {
        formData.value.phoneNum = orderStore.formData.phoneNum;
        formData.value.personNum = orderStore.formData.personNum;
        formData.value.note = orderStore.formData.note;
        formData.value.userName = orderStore.formData.userName;
    }
});
</script>
<style lang="scss" scope>
body {
    background-color: #f7f7f7;
}

.player-admin-checkout {
    .title {
        font-size: 2rem;
    }

    .sub-title {
        font-size: 1.5rem;
    }
}
</style>
