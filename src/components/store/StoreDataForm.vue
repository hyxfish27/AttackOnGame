<script setup>
import { defineModel } from 'vue';
import { ErrorMessage, Field as VField, Form as VForm } from 'vee-validate';
import * as yup from 'yup';

const formData = defineModel({
    type: Object,
    default: () => ({
        name: '',
        phone: '',
        address: '',
        introduce: '',
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
    phone: yup.string().required('聯絡電話為必填項目'),
    address: yup.string().required('地址為必填項目'),
    introduce: yup.string().required('店家描述為必填項目'),
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
            <label for="description" class="form-label">店家描述</label>
            <v-field
                id="description"
                v-model="formData.introduce"
                as="textarea"
                class="form-control"
                style="min-height: 100px; max-height: 200px"
                name="description"
                :rules="formDataSchema.introduce"
                :disabled="!conEdit"
            ></v-field>
            <error-message
                name="description"
                class="text-danger"
            ></error-message>
        </div>

        <!-- if canEdit is true display comfirm button -->
        <div v-if="conEdit" class="justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">確認</button>
        </div>
    </v-form>
</template>
