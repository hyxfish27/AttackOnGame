<template>
    <div class="container">
        <div class="row py-3 justify-content-center">
            <div
                class="col-8 bg-white p-3 border rounded-3 noto-serif-tc lh-lg"
            >
                <div class="col-11 mx-auto py-4">
                    <h4 class="fw-bold pb-5">確認活動資訊</h4>
                    <h6 class="fw-bold pb-2">
                        {{ summaryData?.title }}
                    </h6>
                    <div class="d-flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <title>map-marker-radius</title>
                            <path
                                fill="#666666"
                                d="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z"
                            />
                        </svg>
                        <p class="text-grey66 fw-bold">
                            {{ summaryData?.address }}
                        </p>
                    </div>
                    <div class="d-flex">
                        <svg
                            fill="#666666"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="23"
                        >
                            <title>clock-time-four-outline</title>
                            <path
                                d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
                            />
                        </svg>
                        <p class="text-grey66 fw-bold ps-1">
                            {{ summaryData?.eventStartTime }} ~
                            {{ summaryData?.eventEndTime }}
                        </p>
                    </div>
                </div>
                <div class="col-11 mx-auto py-4">
                    <h4 class="fw-bold pb-3">核對報名資訊</h4>
                    <v-form v-slot="{ errors }" @submit="onSubmit">
                        <div class="mb-3">
                            <label for="InputName" class="form-label"
                                >姓名</label
                            >
                            <v-field
                                id="InputName"
                                v-model="formData.userNmae"
                                type="text"
                                class="form-control"
                                aria-describedby="userNmaeHelp"
                                rules="required"
                                name="姓名"
                                :class="{ 'is-invalid': errors['姓名'] }"
                            ></v-field>
                            <error-message
                                name="姓名"
                                class="text-danger"
                            ></error-message>
                        </div>
                        <div class="mb-3">
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
                        <div class="mb-3">
                            <label for="personNum" class="form-label"
                                >報名人數</label
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
                                v-model="formData.remarkText"
                                type="text"
                                class="form-control"
                                placeholder="請輸入文字"
                                rows="5"
                                name="備註"
                            ></textarea>
                        </div>
                        <div class="mb-3 pt-3">
                            <p>付款金額</p>
                            <p>
                                {{
                                    formData.personNum *
                                    summaryData?.participationFee
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
                            <div class="d-flex align-items-center">
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
                                    :text="agreeContentText"
                                ></modal>
                            </div>
                            <error-message
                                name="同意活動政策"
                                class="text-danger"
                            ></error-message>
                            <button
                                type="submit"
                                class="btn btn-primary mt-5 fw-bold px-4 mx-auto"
                            >
                                確認報名，前往結帳
                            </button>
                        </div>
                    </v-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PlayerAPI from '@/api/Player';
import modal from '@/components/common/simpleModal.vue';

const BsModal = ref(null);
const openModal = () => {
    BsModal.value.myModalShow();
};
const agreeContentText = ref(
    '<p class="fw-bold">確認報名後，請留意以下幾點資訊:</p>1.活動當日未出現且未告知店家者，店家有權力將您設為黑名單，不得異議<br>2.若活動最終無法成團，本平台將會退費至您的帳戶中<br>3.活動最終的詮釋權，以店家為主若有任何問題，歡迎使用聊天室功能與店家訊息討論。'
);

const router = useRouter();
const onSubmitSuccess = () => {
    router.push('/player/admin/recheckout');
};
const onSubmit = onSubmitSuccess;
const formData = ref({
    userNmae: '',
    phoneNum: '',
    personNum: 1,
    remarkText: '',
});
const summaryData = ref(null);
const getSummary = async (eventId) => {
    await PlayerAPI.getSummary(eventId)
        .then((res) => {
            summaryData.value = res.data.data;
            console.log('data', summaryData.value);
        })
        .catch((err) => {
            console.log(err);
        });
};
onMounted(() => {
    // m7sds2vb
    // jvwuz66b
    getSummary('m7sds2vb');
});
</script>
<style lang="scss" scope>
body {
    background-color: #f7f7f7;
}
</style>
