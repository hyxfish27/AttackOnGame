<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <div class="h5">編輯店家資料</div>
            <v-form v-slot="{ errors }" @submit="handleSubmit(onSubmit)">
                <div class="mb-3">
                    <label for="editName" class="form-label">名稱</label>
                    <v-field
                        id="editName"
                        v-model="formData.name"
                        type="text"
                        class="form-control"
                        name="name"
                        rules="required"
                        :class="{ 'is-invalid': errors['name'] }"
                    ></v-field>
                    <error-message
                        name="name"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="mb-3">
                    <label for="editContact" class="form-label">聯絡電話</label>
                    <v-field
                        id="editContact"
                        v-model="formData.car"
                        type="text"
                        class="form-control"
                        name="phone"
                        rules="required"
                        :class="{ 'is-invalid': errors['phone'] }"
                    ></v-field>
                    <error-message
                        name="phone"
                        class="text-danger"
                    ></error-message>
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
                    ></v-field>
                    <error-message
                        name="address"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="mb-3">
                    <label for="editDescription" class="form-label">簡介</label>
                    <v-field
                        id="editDescription"
                        v-model="formData.introduce"
                        as="textarea"
                        class="form-control"
                        name="introduce"
                        rules="required"
                        style="min-height: 200px"
                        :class="{ 'is-invalid': errors['introduce'] }"
                    ></v-field>
                    <error-message
                        name="introduce"
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

const onSubmit = (values) => {
    emit('save', values);
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
