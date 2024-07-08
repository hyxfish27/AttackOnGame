<script setup>
import { defineModel, ref } from 'vue';
import { ErrorMessage, Field as VField, Form as VForm } from 'vee-validate';
import * as yup from 'yup';
import EventAPI from '@/api/Event';
import ImageAPI from '@/api/Image';
import modal from '@/components/common/simpleModal.vue';
import Loading from '@/components/common/Loading.vue';

const formData = defineModel({
    type: Object,
    default: () => ({
        title: '',
        description: '',
        eventStartTime: '',
        eventEndTime: '',
        registrationStartTime: '',
        registrationEndTime: '',
        isFoodAllowed: null,
        maxParticipants: 1,
        minParticipants: 0,
        participationFee: 0,
        address: '',
        eventImageUrl: ['https://i.imgur.com/L3BGkky.jpeg'],
    }),
});
const isLoading = ref(false);
const myData = ref(...formData);
const BsModal = ref(null);
const modalText = ref('');
const fileImg = ref(null);
const eventIdData = ref('');
const dateFormat = (time) => {
    const originalDateString = time;
    const formattedDateString = `${originalDateString}:00Z`;
    return formattedDateString;
};
const postImage = async (eventId, file) => {
    await ImageAPI.postEventImg(eventId, file)
        .then((res) => {
            console.log(res);
            BsModal.value.myModalShow();
            console.log('imgSuccess', formData.value.eventImageUrl);
        })
        .catch((err) => {
            console.log('imgErrEventId', eventIdData.value);
            console.log('imgErr', err);
        });
};
const postEventGo = async (data = {}) => {
    await EventAPI.postEvent(data)
        .then((res) => {
            modalText.value = `「${myData.value.title}」活動建立成功`;
            isLoading.value = false;

            console.log('活動建立成功', res);
            console.log('活動eventId', res.data.data.idNumber);
            eventIdData.value = res.data.data.idNumber;
        })
        .catch((err) => {
            isLoading.value = false;

            const errText = ref('');
            err.response.data.message.forEach((text) => {
                errText.value += `${text}<br>`;
            });
            modalText.value = `「${myData.value.title}」活動建立失敗<br>${errText.value}`;

            BsModal.value.myModalShow();
        })
        .then(() => {
            postImage(eventIdData.value, fileImg.value);
        });
};
const onSend = (theData) => {
    const toApiData = { ...theData };
    toApiData.eventStartTime = dateFormat(theData.eventStartTime);

    isLoading.value = true;
    postEventGo(myData.value);
};

defineProps({
    conEdit: {
        type: Boolean,
        default: true,
    },
});
const minNum = (num, max) => {
    if (num > max) {
        myData.value.minParticipants = max;
    }
};

const emit = defineEmits(['submit']);

const handleSubmit = (value) => {
    console.log('submit', value);
    emit('submit', value);
};

const formDataSchema = {
    title: yup.string().required('活動名稱為必填項目'),
    description: yup.string().required('活動介紹為必填項目'),
    eventStartTime: yup.string().required('活動開始日期為必填項目'),
    eventEndTime: yup.string().required('活動結束日期為必填項目'),
    registrationStartTime: yup.string().required('報名開始日期為必填項目'),
    registrationEndTime: yup.string().required('報名截止日期為必填項目'),
    isFoodAllowed: yup.boolean().required('請填寫店家是否提供食物'),
    maxParticipants: yup
        .number()
        .typeError('請輸入有效的數字')
        .positive('最大參與人數必須為正數')
        .integer('最大參與人數必須為整數')
        .notOneOf([0], '最大參與人數不得為0')
        .required('請填寫最大參與人數'),
    minParticipants: yup
        .number()
        .typeError('請輸入數字')
        .positive('人數必須為正數')
        .integer('必須為整數')
        .notOneOf([0], '成團人數不得為0')
        .required('請填寫最大參與人數'),
    participationFee: yup
        .number()
        .notOneOf([0], '票價不得為0')
        .typeError('請輸入數字')
        .integer('必須為整數')
        .required('請填寫票價'),
    address: yup.string().required('地址為必填項目'),
    eventImageUrl: yup.string().required('請上傳圖片'),
};
const handleFileUpload = (event) => {
    console.log(event);
    const file = event.target.files[0];
    fileImg.value = file;
};
</script>

<template>
    <div>
        <Loading v-if="isLoading"></Loading>
        <modal ref="BsModal" title="執行結果" :text="modalText"></modal>
        <v-form v-slot="{ errors }" class="text-start" @submit="handleSubmit">
            <div class="mb-3">
                <label for="title" class="form-label require-icon"
                    >活動名稱</label
                >
                <v-field
                    id="title"
                    v-model="formData.title"
                    type="text"
                    class="form-control"
                    name="title"
                    :rules="formDataSchema.title"
                    :disabled="!conEdit"
                    :class="{ 'is-invalid': errors['title'] }"
                ></v-field>
                <error-message name="title" class="text-danger"></error-message>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label require-icon"
                    >活動介紹</label
                >
                <v-field
                    id="description"
                    v-model="formData.description"
                    as="textarea"
                    class="form-control"
                    name="description"
                    :rules="formDataSchema.description"
                    :disabled="!conEdit"
                    style="min-height: 100px; max-height: 200px"
                    :class="{ 'is-invalid': errors['description'] }"
                ></v-field>
                <error-message
                    name="description"
                    class="text-danger"
                ></error-message>
            </div>
            <div class="mb-3">
                <label for="address" class="form-label require-icon"
                    >活動地址</label
                >
                <v-field
                    id="address"
                    v-model="formData.address"
                    type="text"
                    class="form-control"
                    name="address"
                    :rules="formDataSchema.address"
                    :disabled="!conEdit"
                    :class="{ 'is-invalid': errors['address'] }"
                ></v-field>
                <error-message
                    name="address"
                    class="text-danger"
                ></error-message>
            </div>
            <div class="d-flex gap-3">
                <div class="mb-3 w-50">
                    <label for="eventStartTime" class="form-label require-icon"
                        >活動開始日期</label
                    >
                    <v-field
                        id="eventStartTime"
                        v-model="formData.eventStartTime"
                        type="datetime-local"
                        class="form-control"
                        name="eventStartTime"
                        :rules="formDataSchema.eventStartTime"
                        :disabled="!conEdit"
                        :class="{ 'is-invalid': errors['eventStartTime'] }"
                    ></v-field>
                    <error-message
                        name="eventStartTime"
                        class="text-danger"
                    ></error-message>
                </div>
                <div class="mb-3 w-50">
                    <label for="eventEndTime" class="form-label require-icon"
                        >活動截止日期</label
                    >
                    <v-field
                        id="eventEndTime"
                        v-model="formData.eventEndTime"
                        type="datetime-local"
                        class="form-control"
                        name="eventEndTime"
                        :rules="formDataSchema.eventEndTime"
                        :disabled="!conEdit"
                        :class="{ 'is-invalid': errors['eventEndTime'] }"
                    ></v-field>
                    <error-message
                        name="eventEndTime"
                        class="text-danger"
                    ></error-message>
                </div>
            </div>
            <div class="d-flex gap-3">
                <div class="mb-3 w-50">
                    <label
                        for="registrationStartTime"
                        class="form-label require-icon"
                        >報名開始日期</label
                    >
                    <v-field
                        id="registrationStartTime"
                        v-model="formData.registrationStartTime"
                        type="datetime-local"
                        class="form-control"
                        name="registrationStartTime"
                        :rules="formDataSchema.registrationStartTime"
                        :disabled="!conEdit"
                        :class="{
                            'is-invalid': errors['registrationStartTime'],
                        }"
                    ></v-field>
                    <error-message
                        name="registrationStartTime"
                        class="text-danger"
                    ></error-message>
                </div>
                <div class="mb-3 w-50">
                    <label
                        for="registrationEndTime"
                        class="form-label require-icon"
                        >報名截止日期</label
                    >
                    <v-field
                        id="registrationEndTime"
                        v-model="formData.registrationEndTime"
                        type="datetime-local"
                        class="form-control"
                        name="registrationEndTime"
                        :rules="formDataSchema.registrationEndTime"
                        :disabled="!conEdit"
                        :class="{ 'is-invalid': errors['registrationEndTime'] }"
                    ></v-field>
                    <error-message
                        name="registrationEndTime"
                        class="text-danger"
                    ></error-message>
                </div>
            </div>

            <div class="d-flex gap-3">
                <div class="mb-3 w-50">
                    <label for="maxParticipants" class="form-label require-icon"
                        >最大參與人數</label
                    >
                    <v-field
                        id="maxParticipants"
                        v-model="formData.maxParticipants"
                        type="number"
                        class="form-control"
                        name="maxParticipants"
                        :rules="formDataSchema.maxParticipants"
                        :disabled="!conEdit"
                        :class="{ 'is-invalid': errors['maxParticipants'] }"
                    ></v-field>
                    <error-message
                        name="maxParticipants"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="mb-3 w-50">
                    <label for="minParticipants" class="form-label require-icon"
                        >最低開設人數</label
                    >
                    <v-field
                        id="minParticipants"
                        v-model="myData.minParticipants"
                        type="number"
                        class="form-control"
                        name="minParticipants"
                        :max="formData.maxParticipants"
                        :rules="formDataSchema.minParticipants"
                        :disabled="!conEdit"
                        :class="{ 'is-invalid': errors['minParticipants'] }"
                        @blur="
                            minNum(
                                myData.minParticipants,
                                formData.maxParticipants
                            )
                        "
                    ></v-field>
                    <error-message
                        name="minParticipants"
                        class="text-danger"
                    ></error-message>
                </div>
            </div>
            <div class="d-flex gap-3">
                <div class="mb-3 w-50">
                    <p for="isFoodAllowed" class="form-label mb-3 require-icon">
                        是否可攜帶外食
                    </p>
                    <div class="d-flex gap-3">
                        <label>
                            <v-field
                                v-model="formData.isFoodAllowed"
                                type="radio"
                                value="true"
                                :disabled="!conEdit"
                                name="isFoodAllowed"
                                :rules="formDataSchema.isFoodAllowed"
                            ></v-field>
                            是
                        </label>
                        <label>
                            <v-field
                                v-model="formData.isFoodAllowed"
                                type="radio"
                                value="false"
                                name="isFoodAllowed"
                                :disabled="!conEdit"
                                :rules="formDataSchema.isFoodAllowed"
                            ></v-field>
                            否
                        </label>
                    </div>
                    <error-message
                        name="isFoodAllowed"
                        class="text-danger"
                    ></error-message>
                </div>
                <div class="mb-3 w-50">
                    <label
                        for="participationFee"
                        class="form-label require-icon"
                        >票價</label
                    >
                    <v-field
                        id="participationFee"
                        v-model="formData.participationFee"
                        type="number"
                        class="form-control"
                        name="participationFee"
                        :rules="formDataSchema.participationFee"
                        :disabled="!conEdit"
                        :class="{ 'is-invalid': errors['participationFee'] }"
                    ></v-field>
                    <error-message
                        name="participationFee"
                        class="text-danger"
                    ></error-message>
                </div>
            </div>

            <div class="mb-3">
                <p class="mb-2 require-icon">活動封面圖片</p>
                <div class="input-group">
                    <v-field
                        id="eventImageUrl"
                        v-field:disabled="!conEdit"
                        type="file"
                        class="form-control"
                        name="eventImageUrl"
                        :rules="formDataSchema.eventImageUrl"
                        :class="{ 'is-invalid': errors['eventImageUrl'] }"
                        @change="handleFileUpload($event)"
                    >
                    </v-field>
                    <label class="input-group-text" for="eventImageUrl"
                        >更新上傳圖片</label
                    >
                </div>
                <error-message
                    name="eventImageUrl"
                    class="text-danger"
                ></error-message>
            </div>

            <div v-if="conEdit" class="justify-content-center d-flex">
                <button
                    type="submit"
                    class="btn btn-primary"
                    @click="onSend(formData)"
                >
                    確認
                </button>
            </div>
        </v-form>
    </div>
</template>
<style>
.require-icon::before {
    content: '*';
    font-size: 0.75rem;
    color: #dc3545;
    margin-right: 4px;
}
</style>
