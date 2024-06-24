<script setup>
import { defineModel } from 'vue';

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
</script>

<template>
    <v-form>
        <div class="mb-3">
            <label for="name" class="form-label">店家名稱</label>
            <v-field
                id="name"
                v-model="formData.name"
                type="text"
                class="form-control"
                name="name"
                rules="required"
                :disabled="!conEdit"
            ></v-field>
        </div>

        <div class="mb-3">
            <label for="contact" class="form-label">聯絡電話</label>
            <v-field
                id="contact"
                v-model="formData.phone"
                type="text"
                class="form-control"
                name="contact"
                rules="required"
                :disabled="!conEdit"
            ></v-field>
        </div>

        <div class="mb-3">
            <label for="address" class="form-label">地址</label>
            <v-field
                id="address"
                v-model="formData.address"
                type="text"
                class="form-control"
                name="address"
                rules="required"
                :disabled="!conEdit"
            ></v-field>
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
                rules="required"
                :disabled="!conEdit"
            ></v-field>
        </div>

        <!-- if canEdit is true display comfirm button -->
        <div v-if="conEdit" class="justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">確認</button>
        </div>
    </v-form>
</template>
