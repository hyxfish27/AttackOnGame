<template>
    <div class="store-admin container flex-grow-1 py-4">
        <div class="row">
            <StoreLeftEl />
            <div class="col-9">
                <div class="border rounded h-100 py-4 px-6 shadow">
                    <div class="d-flex row justify-between border-bottom pb-2">
                        <div class="col h6">店家資料</div>
                        <div class="col text-end">
                            <button
                                class="btn btn-outline-primary me-2"
                                @click="openModal"
                            >
                                編輯資料
                            </button>

                            <button
                                class="btn btn-outline-primary"
                                @click="toPasswordModify"
                            >
                                更改密碼
                            </button>
                        </div>
                    </div>

                    <div
                        class="d-flex h-100 justify-content-center align-items-center"
                    >
                        <div class="justify-center align-center">
                            <v-form>
                                <div class="d-flex row">
                                    <div class="mb-3 col">
                                        <label for="name" class="form-label"
                                            >店家名稱</label
                                        >
                                        <v-field
                                            id="name"
                                            v-model="store.name"
                                            type="text"
                                            class="form-control"
                                            name="name"
                                            rules="required"
                                            disabled
                                        ></v-field>
                                    </div>

                                    <div class="mb-3 col">
                                        <label for="contact" class="form-label"
                                            >聯絡電話</label
                                        >
                                        <v-field
                                            id="contact"
                                            v-model="store.phone"
                                            type="text"
                                            class="form-control"
                                            name="contact"
                                            rules="required"
                                            disabled
                                        ></v-field>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="address" class="form-label"
                                        >地址</label
                                    >
                                    <v-field
                                        id="address"
                                        v-model="store.address"
                                        type="text"
                                        class="form-control"
                                        name="address"
                                        rules="required"
                                        disabled
                                    ></v-field>
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label"
                                        >店家描述</label
                                    >
                                    <v-field
                                        id="description"
                                        v-model="store.introduce"
                                        as="textarea"
                                        class="form-control"
                                        style="min-height: 200px"
                                        name="description"
                                        rules="required"
                                        disabled
                                    ></v-field>
                                </div>
                            </v-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <EditStoreModal
            v-if="showModal"
            :store="store"
            @close="closeModal"
            @save="saveChanges"
        />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import EditStoreModal from '@/components/EditStoreModal.vue';
import useIndexStore from '@/stores/index';
import StoreLeftEl from '@/components/store/StoreLeftEl.vue';
import { Form as VForm, Field as VField } from 'vee-validate';

/**
 * {
            name: '好玩工作室',
            address: '台北市信義區信義路20號20樓',
            rating: 4.5,
            contact: '0987654321',
            description: '這是一家很棒的店家。',
            location: {
                city: '',
                district: '',
                detailedAddress: '',
            },
        }
 */

const indexStore = useIndexStore();
const store = computed(() => indexStore.storeData);

console.log('StroeData', store.value);

const showModal = ref(false);

const openModal = () => {
    console.log('openModal');
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const saveChanges = (updatedStore) => {
    store.value = updatedStore;
    closeModal();
};
</script>

<style lang="scss" scoped>
.store-admin {
    &__info {
        padding: 24px;

        &__img {
            width: 100px;
            height: 100px;
            background-color: #ccc;
            margin-right: 24px;
        }
    }
}

.shadow {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
