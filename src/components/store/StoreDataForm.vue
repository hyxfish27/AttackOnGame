<script setup>
import { defineModel, computed } from 'vue';
import { ErrorMessage, Field as VField, Form as VForm } from 'vee-validate';
import * as yup from 'yup';
import ImageAPI from '@/api/Image';
import useIndexStore from '@/stores/index';

const indexStore = useIndexStore();
const userData = computed(() => indexStore.userData);
// import ImageAPI from '@/api/Image';

const formData = defineModel({
    type: Object,
    default: () => ({
        name: '',
        phone: '',
        address: '',
        introduce: '',
        avatar: '',
    }),
});

defineProps({
    conEdit: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['submit']);

const handleSubmit = (value) => {
    console.log('submit', value);
    emit('submit', value);
};

const formDataSchema = {
    name: yup.string().required('店家名稱為必填項目'),
    phone: yup
        .string()
        .required('聯絡電話為必填項目')
        .matches(/^0[0-9]{9}$/, '請輸入10位數的手機號碼'),
    address: yup.string().required('地址為必填項目'),
    introduce: yup.string().required('店家描述為必填項目'),
    avatar: yup.string().required('請上傳圖片'),
};
const postImage = async (userId, file) => {
    console.log(userId);
    await ImageAPI.postStoreImg(userId, file)
        .then((res) => {
            console.log('imageRes', res);
            formData.value.avatar = res.data.imgURL;
            console.log('res.imgURL', res.data.imgURL);
        })
        .catch((err) => {
            console.log('imageErr', err);
        });
};
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    formData.value.avatar = file;
    postImage(userData.value.id, formData.value.avatar);
};
</script>

<template>
    <v-form @submit="handleSubmit">
        <div class="mb-3">
            <label for="name" class="form-label">店家名稱</label>
            <v-field
                id="name"
                v-model="formData.name"
                type="text"
                class="form-control"
                name="name"
                :rules="formDataSchema.name"
                :disabled="!conEdit"
            ></v-field>
            <error-message name="name" class="text-danger"></error-message>
        </div>

        <div class="mb-3">
            <label for="phone" class="form-label">聯絡電話</label>
            <v-field
                id="phone"
                v-model="formData.phone"
                type="text"
                class="form-control"
                name="phone"
                :rules="formDataSchema.phone"
                :disabled="!conEdit"
            ></v-field>
            <error-message name="phone" class="text-danger"></error-message>
        </div>

        <div class="mb-3">
            <label for="address" class="form-label">地址</label>
            <v-field
                id="address"
                v-model="formData.address"
                type="text"
                class="form-control"
                name="address"
                :rules="formDataSchema.address"
                :disabled="!conEdit"
            ></v-field>
            <error-message name="address" class="text-danger"></error-message>
        </div>

        <div class="mb-3">
            <label for="introduce" class="form-label">店家描述</label>
            <v-field
                id="introduce"
                v-model="formData.introduce"
                as="textarea"
                class="form-control"
                style="min-height: 100px; max-height: 200px"
                name="introduce"
                :rules="formDataSchema.introduce"
                :disabled="!conEdit"
            ></v-field>
            <error-message name="introduce" class="text-danger"></error-message>
        </div>
        <div class="mb-3">
            <label for="avatar" class="form-label">上傳頭像</label>
            <div class="mb-2">
                <img
                    v-if="formData.avatar"
                    width="54"
                    :src="formData.avatar"
                    alt="店家頭像"
                />
            </div>

            <input
                id="avatar"
                type="file"
                class="form-control"
                name="avatar"
                :rules="formDataSchema.avatar"
                :disabled="!conEdit"
                @change="handleFileUpload"
            />
            <error-message name="avatar" class="text-danger"></error-message>
        </div>

        <!-- if canEdit is true display comfirm button -->
        <div v-if="conEdit" class="justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">確認</button>
        </div>
    </v-form>
</template>
