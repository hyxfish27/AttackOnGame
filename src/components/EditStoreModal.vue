<template>
    <div class="modal-overlay backdrop-blur" @click.self="close">
        <div class="modal-content">
            <div class="h5">編輯店家資料</div>
            <v-form v-slot="{ errors }" @submit="onSubmit">
                <div class="mb-3">
                    <label for="editName" class="form-label require-icon"
                        >名稱</label
                    >
                    <v-field
                        id="editName"
                        v-model="formData.name"
                        type="text"
                        class="form-control"
                        name="name"
                        :rules="formDataSchema.name"
                        :class="{ 'is-invalid': errors['name'] }"
                    ></v-field>
                    <error-message
                        name="name"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="mb-3">
                    <label for="editContact" class="form-label require-icon"
                        >聯絡電話</label
                    >
                    <v-field
                        id="editContact"
                        v-model="formData.phone"
                        type="text"
                        class="form-control"
                        name="phone"
                        :rules="formDataSchema.phone"
                        :class="{ 'is-invalid': errors['phone'] }"
                    ></v-field>
                    <error-message
                        name="phone"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label require-icon"
                        >地址</label
                    >
                    <v-field
                        id="address"
                        v-model="formData.address"
                        type="text"
                        class="form-control"
                        name="address"
                        :rules="formDataSchema.address"
                    ></v-field>
                    <error-message
                        name="address"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="mb-3">
                    <label for="editDescription" class="form-label require-icon"
                        >簡介</label
                    >
                    <v-field
                        id="editDescription"
                        v-model="formData.introduce"
                        as="textarea"
                        class="form-control"
                        name="introduce"
                        :rules="formDataSchema.introduce"
                        style="min-height: 200px"
                        :class="{ 'is-invalid': errors['introduce'] }"
                    ></v-field>
                    <error-message
                        name="introduce"
                        class="text-danger"
                    ></error-message>
                </div>
                <div class="mb-3">
                    <label for="avatar" class="form-label">上傳頭像</label>
                    <div class="mb-2">
                        <img
                            v-if="formData.avatar"
                            width="50"
                            :src="formData.avatar"
                            alt=""
                        />
                    </div>
                    <input
                        id="avatar"
                        type="file"
                        class="form-control"
                        name="avatar"
                        @change="handleFileUpload"
                    />
                    <error-message
                        name="avatar"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="row flex-row">
                    <button
                        type="button"
                        class="btn btn-secondary col me-2"
                        @click="close"
                    >
                        取消
                    </button>
                    <button type="submit" class="btn btn-primary col">
                        更改
                    </button>
                </div>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import ImageAPI from '@/api/Image';

const props = defineProps({
    store: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['close', 'save']);

const formData = ref({ ...props.store });

const close = () => {
    emit('close');
};

const formDataSchema = {
    name: yup.string().required('店家名稱為必填項目'),
    phone: yup
        .string()
        .required('聯絡電話為必填項目')
        .matches(/^0[0-9]{9}$/, '請輸入10位數的手機號碼'),
    address: yup.string().required('地址為必填項目'),
    introduce: yup.string().required('店家描述為必填項目'),
};
const onSubmit = (values) => {
    console.log('valueee', values);
    console.log('formData.value222', formData.value);
    emit('save', values);
    console.log('formData.value.avatar', formData.value.avatar);
};
const postImage = async (storeId, file) => {
    console.log('test', storeId, file);
    await ImageAPI.postStoreImg(storeId, file)
        .then((res) => {
            console.log('imageRes', res);
            formData.value.avatar = res.data.imgURL;
            console.log('res.imgURL', res.data.imgURL);
        })
        .catch((err) => {
            console.log('file, storeId', file, storeId);
            console.log('imageErr', err);
        });
};
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    formData.value.avatar = file;
    postImage(props.store.user, file);
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
}

.is-invalid {
    border-color: #dc3545;
}

.text-danger {
    color: #dc3545;
}
</style>
