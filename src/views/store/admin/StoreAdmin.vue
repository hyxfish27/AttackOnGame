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
                        <div class="flex-grow-1">
                            <StoreDataForm v-model="store" />
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
import StoreDataForm from '@/components/store/StoreDataForm.vue';
import StoreAPI from '@/api/Store';

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

const saveChanges = async (updatedStore) => {
    try {
        await StoreAPI.update(store.value._id, updatedStore);
        store.value = updatedStore;
        closeModal();
    } catch (error) {
        console.error(error);
    }
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
