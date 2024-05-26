<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <h2>編輯店家資料</h2>
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
                        v-model="formData.contact"
                        type="text"
                        class="form-control"
                        name="contact"
                        rules="required"
                        :class="{ 'is-invalid': errors['contact'] }"
                    ></v-field>
                    <error-message
                        name="contact"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="mb-3">
                    <label for="editDescription" class="form-label">簡介</label>
                    <v-field
                        id="editDescription"
                        v-model="formData.description"
                        as="textarea"
                        class="form-control"
                        name="description"
                        rules="required"
                        :class="{ 'is-invalid': errors['description'] }"
                    ></v-field>
                    <error-message
                        name="description"
                        class="text-danger"
                    ></error-message>
                </div>

                <div class="mb-3">
                    <label class="form-label">活動地區</label>
                    <div class="row">
                        <div class="col">
                            <v-field
                                v-model="formData.location.city"
                                type="text"
                                class="form-control"
                                placeholder="縣市"
                                name="city"
                                rules="required"
                                :class="{ 'is-invalid': errors['city'] }"
                            ></v-field>
                            <error-message
                                name="city"
                                class="text-danger"
                            ></error-message>
                        </div>
                        <div class="col">
                            <v-field
                                v-model="formData.location.district"
                                type="text"
                                class="form-control"
                                placeholder="地區"
                                name="district"
                                rules="required"
                                :class="{ 'is-invalid': errors['district'] }"
                            ></v-field>
                            <error-message
                                name="district"
                                class="text-danger"
                            ></error-message>
                        </div>
                        <div class="col">
                            <v-field
                                v-model="formData.location.detailedAddress"
                                type="text"
                                class="form-control"
                                placeholder="詳細地址"
                                name="detailedAddress"
                                rules="required"
                                :class="{
                                    'is-invalid': errors['detailedAddress'],
                                }"
                            ></v-field>
                            <error-message
                                name="detailedAddress"
                                class="text-danger"
                            ></error-message>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-secondary" @click="close">
                    取消
                </button>
                <button type="submit" class="btn btn-primary">更改</button>
            </v-form>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        store: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const formData = ref({ ...props.store });

        const close = () => {
            emit('close');
        };

        const onSubmit = (values) => {
            emit('save', values);
        };

        return { formData, close, onSubmit };
    },
});
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
