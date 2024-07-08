<template>
    <div class="container-xxl">
        <div class="row p-3">
            <StoreLeftEl />
            <div class="col-9 min-h-screen">
                <div class="border rounded bg-white h-100 py-4 px-6">
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
                        <div class="flex-grow-1 bg-white">
                            <StoreDataForm v-model="store" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <EditStoreModal
            v-if="showModal"
            :store="store"
            :user-data="userData"
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
import EventAPI from '@/api/Event';

const indexStore = useIndexStore();
const store = computed(() => indexStore.storeData);
const userData = computed(() => indexStore.userData);

console.log('StroeData', store.value);

const showModal = ref(false);

const openModal = () => {
    console.log('openModal');
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};
const newStoreData = async (storeId) => {
    await EventAPI.getStore(storeId)
        .then((res) => {
            console.log('newStoreData ', res.data);
            store.value = res.data;
            indexStore.setStore(res.data);
        })
        .catch((err) => {
            console.log('newStoreData ', err);
        });
};
const saveChanges = async (updatedStore) => {
    try {
        await StoreAPI.update(store.value._id, updatedStore);
        newStoreData(store.value._id);
        closeModal();
    } catch (error) {
        console.error(error);
    }
};

const toPasswordModify = () => {
    alert('未來更新，敬請期待');
};
</script>

<style lang="scss" scoped></style>
